// Estado actual de la partida
let gameState = {
    currentNode: 'ch1_start',
    inventory: [],
    flags: {}, // Added flags support here
    currentChapter: '',
    theme: '',
    safeCode: '' // Randomized per savefile
};

let currentSlot = 1; // Slot activo

// Elementos del menú
const mainMenu = document.getElementById('main-menu');
const gameContainer = document.getElementById('game-container');
const btnReturnMenu = document.getElementById('btn-return-menu');
const btnDeleteSaves = document.getElementById('btn-delete-saves');
const saveSlotButtons = document.querySelectorAll('.save-slot');

// Cargar la UI del menú
function initMenu() {
    saveSlotButtons.forEach(btn => {
        const slot = btn.getAttribute('data-slot');
        const data = getSaveData(slot);
        if (data) {
            btn.textContent = `Ranura ${slot}: ${data.currentChapter || 'Progreso'}`;
        } else {
            btn.textContent = `Ranura ${slot}: Nueva Partida`;
        }
        
        // Listener al click
        btn.onclick = () => {
            currentSlot = slot;
            startGame(data);
        };
    });

    btnDeleteSaves.onclick = () => {
        if(confirm('¿Estás seguro de que quieres borrar TODOS los progresos?')) {
            deleteAllSaves();
            initMenu();
        }
    };
    
    btnReturnMenu.onclick = () => {
        if(!isTyping) {
            mainMenu.style.display = 'flex';
            gameContainer.style.display = 'none';
            initMenu();
            consoleOutput.innerHTML = '';
        }
    };
}

// Iniciar el juego
function startGame(savedData) {
    initAudio(); // Inicializar audio con la primera interacción
    
    mainMenu.style.display = 'none';
    gameContainer.style.display = 'flex';
    consoleOutput.innerHTML = '';
    
    if (savedData) {
        gameState = savedData;
        gameState.flags = gameState.flags || {}; // Ensure flags object exists
        printText("SISTEMA: Cargando datos desde almacenamiento local...", "system", () => {
            setTimeout(() => {
                applyTheme(gameState.theme || '');
                updateInventoryUI(gameState.inventory);
                chapterDisplay.textContent = `Capítulo: ${gameState.currentChapter}`;
                loadNode(gameState.currentNode, true); // true indica que estamos recargando
            }, 800);
        });
    } else {
        // Estado por defecto
        gameState = {
            currentNode: 'ch1_start',
            inventory: [],
            flags: {},
            currentChapter: '',
            theme: '',
            safeCode: (Math.floor(Math.random() * 31) + 1).toString().padStart(2, '0') // Genera de "01" a "31"
        };
        applyTheme('');
        printText("INICIANDO PROTOCOLO DE SIMULACIÓN...", "system", () => {
            setTimeout(() => {
                loadNode(gameState.currentNode);
            }, 800);
        });
    }
}

// Cargar un nodo narrativo
function loadNode(nodeId, isReloading = false) {
    const node = storyNodes[nodeId];
    if (!node) {
        console.error("No node found: ", nodeId);
        return;
    }
    
    // Asegurar que exista un safeCode en partidas viejas
    if (!gameState.safeCode) {
        gameState.safeCode = (Math.floor(Math.random() * 31) + 1).toString().padStart(2, '0');
    }

    gameState.currentNode = nodeId;
    let uiUpdated = false;

    // Procesar Cambio de Capítulo, Tema y Música (incluso al recargar partida)
    let chapterChanged = (node.chapter && node.chapter !== gameState.currentChapter);
    
    if (chapterChanged || isReloading) {
        if (node.chapter) {
            gameState.currentChapter = node.chapter;
        }
        chapterDisplay.textContent = `Capítulo: ${gameState.currentChapter}`;
        
        if (chapterChanged && !isReloading) {
            const stageDiv = document.createElement('div');
            stageDiv.className = 'log-entry stage-change';
            stageDiv.textContent = `--- ${gameState.currentChapter.toUpperCase()} ---`;
            consoleOutput.appendChild(stageDiv);
        }
        
        // Determinar pista BGM por el nombre del capítulo (orden inverso para evitar fallos con números romanos)
        let trackNum = 0;
        let capUpper = gameState.currentChapter.toUpperCase();
        
        if (capUpper.includes("CAPÍTULO V") || capUpper.includes("EPÍLOGO") || capUpper.includes("EPILOGO") || capUpper.includes("HORIZONTE")) trackNum = 5;
        else if (capUpper.includes("CAPÍTULO IV")) trackNum = 4;
        else if (capUpper.includes("CAPÍTULO III")) trackNum = 3;
        else if (capUpper.includes("CAPÍTULO II")) trackNum = 2;
        else if (capUpper.includes("CAPÍTULO I")) trackNum = 1;
        
        playBGM(trackNum);
        
        if (chapterChanged) {
            uiUpdated = true;
        }
    }

    if (node.theme !== undefined) {
        gameState.theme = node.theme;
        applyTheme(gameState.theme);
    }

    // Efecto de sonido del nodo
    if (node.sfx && !isReloading) {
        playSFX(node.sfx);
    }

    // Process setFlag on the node itself
    if (node.setFlag && !isReloading) {
        gameState.flags[node.setFlag] = true;
    }

    // Procesar Logros
    if (node.achievement && !isReloading) {
        unlockAchievement(node.achievement);
    }

    // Lógica de Guardado Estilo Undertale (Puntos de guardado específicos)
    if (node.isSavePoint && !isReloading) {
        saveGame(currentSlot, gameState);
        setTimeout(() => {
            playSFX('save');
            printText("Sientes una extraña determinación... [PARTIDA GUARDADA]", "system");
        }, 1000);
    }

    // Lógica de Inventario
    if (node.itemRemoveAll && !isReloading) {
        gameState.inventory = [];
        updateInventoryUI(gameState.inventory);
        printText("Tu inventario ha sido devorado por el vacío.", "item", () => {
             processItem();
        });
    } else {
        processItem();
    }

    function processItem() {
        if (node.item && !gameState.inventory.includes(node.item)) {
            gameState.inventory.push(node.item);
            updateInventoryUI(gameState.inventory);
            if(!isReloading) {
                printText(`+ Has obtenido: [${node.item}]`, "item", () => {
                    printMainText();
                });
                return;
            }
        }
        printMainText();
    }
    
    function printMainText() {
        let nodeText = node.text;
        if (nodeText.includes('{{safeCode}}')) {
            nodeText = nodeText.replace('{{safeCode}}', gameState.safeCode);
        }

        printText(nodeText, "narrative", () => {
            renderButtons(node.choices, (nextNodeId) => {
                loadNode(nextNodeId);
            }, node);
        });
    }
}

// Arrancar menú al cargar
window.onload = () => {
    initMenu();
};
