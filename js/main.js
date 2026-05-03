// Estado actual de la partida
let gameState = {
    currentNode: 'ch1_start',
    inventory: [],
    flags: {}, // Added flags support here
    currentChapter: '',
    theme: ''
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
            theme: ''
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
    
    gameState.currentNode = nodeId;
    let uiUpdated = false;

    // Procesar Cambio de Capítulo y Tema
    if (node.chapter && node.chapter !== gameState.currentChapter) {
        gameState.currentChapter = node.chapter;
        chapterDisplay.textContent = `Capítulo: ${gameState.currentChapter}`;
        
        if (!isReloading) {
            const stageDiv = document.createElement('div');
            stageDiv.className = 'log-entry stage-change';
            stageDiv.textContent = `--- ${gameState.currentChapter.toUpperCase()} ---`;
            consoleOutput.appendChild(stageDiv);
        }
        
        // Determinar pista BGM por el nombre del capítulo
        let trackNum = 0;
        if (gameState.currentChapter.includes("Capítulo II")) trackNum = 2;
        else if (gameState.currentChapter.includes("Capítulo III")) trackNum = 3;
        else if (gameState.currentChapter.includes("Capítulo IV")) trackNum = 4;
        else if (gameState.currentChapter.includes("Capítulo V") || gameState.currentChapter.includes("Epílogo")) trackNum = 5;
        else if (gameState.currentChapter.includes("Capítulo I")) trackNum = 1;
        
        playBGM(trackNum);
        
        uiUpdated = true;
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
        printText(node.text, "narrative", () => {
            renderButtons(node.choices, (nextNodeId) => {
                loadNode(nextNodeId);
            });
        });
    }
}

// Arrancar menú al cargar
window.onload = () => {
    initMenu();
};
