// Variables globales del motor visual
let isTyping = false;
const typeSpeed = 20;

// Referencias del DOM
const consoleOutput = document.getElementById('console-output');
const buttonContainer = document.getElementById('button-container');
const inventoryList = document.getElementById('inventory-list');
const chapterDisplay = document.getElementById('current-chapter');
const typingCommand = document.getElementById('typing-command');
const inputContainer = document.getElementById('input-container');
const nodeInput = document.getElementById('node-input');
const nodeSubmit = document.getElementById('node-submit');

// Logros DOM
const achContainer = document.getElementById('achievement-container');
const achTitle = document.getElementById('ach-title');
const achDesc = document.getElementById('ach-desc');
let unlockedAchievements = JSON.parse(localStorage.getItem('el_ascenso_achievements')) || [];

// --- SISTEMA DE AUDIO (SFX Procedural y BGM) ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let currentBGM = null;
let currentBGMTrack = 0;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    // Si ya había una pista cargada pero no sonaba, reintentar
    if (currentBGM && currentBGM.paused) {
        currentBGM.play().catch(() => {});
    }
}

function playBGM(trackNumber) {
    if (currentBGMTrack === trackNumber) return;
    
    // Fade out pista actual
    if (currentBGM) {
        const oldBGM = currentBGM;
        let vol = oldBGM.volume;
        const fadeOut = setInterval(() => {
            vol -= 0.05;
            if (vol <= 0) {
                oldBGM.pause();
                oldBGM.currentTime = 0;
                clearInterval(fadeOut);
            } else {
                oldBGM.volume = vol;
            }
        }, 100);
    }
    
    currentBGMTrack = trackNumber;
    
    if (trackNumber > 0) {
        currentBGM = new Audio(`ost/${trackNumber}.mp3`);
        currentBGM.loop = true;
        currentBGM.volume = 0;
        
        const playPromise = currentBGM.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Fade in
                let vol = 0;
                const fadeIn = setInterval(() => {
                    vol += 0.05;
                    if (vol >= 0.4) { // Vol máximo 40% para no tapar los sfx
                        currentBGM.volume = 0.4;
                        clearInterval(fadeIn);
                    } else {
                        currentBGM.volume = vol;
                    }
                }, 100);
            }).catch(error => {
                console.log("Auto-play prevented", error);
            });
        }
    }
}

function playSFX(type) {
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    const now = audioCtx.currentTime;
    
    switch (type) {
        case 'beep': // Contestador automático
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.5, now + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
            break;
        case 'static': // Estática del contestador
            const bufferSize = audioCtx.sampleRate * 2; // 2 sec
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            const noiseFilter = audioCtx.createBiquadFilter();
            noiseFilter.type = 'lowpass';
            noiseFilter.frequency.value = 1500;
            noise.connect(noiseFilter);
            noiseFilter.connect(gainNode);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.linearRampToValueAtTime(0, now + 2);
            noise.start(now);
            break;
        case 'shatter': // Romper cristal
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
            gainNode.gain.setValueAtTime(0.6, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
            break;
        case 'save': // Guardado Undertale
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now); // A4
            osc.frequency.setValueAtTime(554.37, now + 0.15); // C#5
            osc.frequency.setValueAtTime(659.25, now + 0.3); // E5
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gainNode.gain.setValueAtTime(0.3, now + 0.4);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
            osc.start(now);
            osc.stop(now + 0.8);
            break;
        case 'door': // Puerta / golpe sordo
            osc.type = 'sine';
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.exponentialRampToValueAtTime(20, now + 0.3);
            gainNode.gain.setValueAtTime(0.8, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
            break;
        case 'type': // Clic sutil de máquina de escribir
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            gainNode.gain.setValueAtTime(0.015, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
            osc.start(now);
            osc.stop(now + 0.03);
            break;
        case 'achievement': // Logro (Arpegio rápido)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
            osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.6);
            osc.start(now);
            osc.stop(now + 0.6);
            break;
    }
}

// Sistema de Logros
function unlockAchievement(ach) {
    if (unlockedAchievements.includes(ach.id)) return;
    unlockedAchievements.push(ach.id);
    localStorage.setItem('el_ascenso_achievements', JSON.stringify(unlockedAchievements));
    
    achTitle.textContent = "Logro: " + ach.title;
    achDesc.textContent = ach.desc;
    
    playSFX('achievement');
    
    achContainer.classList.add('show');
    setTimeout(() => {
        achContainer.classList.remove('show');
    }, 5000);
}

// Actualizar la lista de inventario en pantalla
function updateInventoryUI(inventory) {
    inventoryList.innerHTML = '';
    if (inventory.length === 0) {
        const li = document.createElement('li');
        li.className = 'empty-inv';
        li.textContent = 'Vacío';
        inventoryList.appendChild(li);
    } else {
        inventory.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            inventoryList.appendChild(li);
        });
    }
}

// Efecto de máquina de escribir genérico
function typeText(text, element, callback) {
    isTyping = true;
    let i = 0;
    element.innerHTML = '';
    
    function typeChar() {
        if (i < text.length) {
            if (text.substring(i, i+1) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
                if (i % 3 === 0) playSFX('type'); // Tocar sonido cada 3 caracteres para no saturar
            }
            i++;
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
            setTimeout(typeChar, typeSpeed);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    typeChar();
}

// Imprimir texto narrativo en la consola
function printText(text, type = "narrative", callback = null) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    consoleOutput.appendChild(entry);
    
    typeText(text, entry, callback);
}

// Simular la escritura de un comando por el jugador
function simulateCommandTyping(command, callback) {
    isTyping = true;
    let i = 0;
    typingCommand.textContent = '';
    
    disableButtons();
    
    function typeChar() {
        if (i < command.length) {
            typingCommand.textContent += command.charAt(i);
            if (i % 2 === 0) playSFX('type');
            i++;
            setTimeout(typeChar, 30);
        } else {
            setTimeout(() => {
                const entry = document.createElement('div');
                entry.className = `log-entry action`;
                entry.textContent = `> ${command}`;
                consoleOutput.appendChild(entry);
                typingCommand.textContent = '';
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
                if (callback) callback();
            }, 300);
        }
    }
    typeChar();
}

// Renderizar botones para las elecciones del jugador y campo de texto si es necesario
function renderButtons(choices, onChoiceCallback, node) {
    buttonContainer.innerHTML = '';
    if (inputContainer) {
        inputContainer.style.display = 'none';
        nodeSubmit.disabled = false;
        nodeInput.disabled = false;
        nodeSubmit.onclick = null;
    }

    if (node && node.inputType === 'text') {
        inputContainer.style.display = 'flex';
        nodeInput.value = '';
        nodeInput.focus();
        
        nodeSubmit.onclick = () => {
            if (isTyping) return;
            const val = nodeInput.value.trim();
            if (val === '') return;
            
            disableButtons();
            
            simulateCommandTyping(val, () => {
                inputContainer.style.display = 'none';
                
                // Evaluar la respuesta contra la variable del gameState
                let targetVar = node.expectedInputVar ? gameState[node.expectedInputVar] : null;
                
                if (val === targetVar) {
                    onChoiceCallback(node.inputSuccessNext);
                } else {
                    onChoiceCallback(node.inputFailNext);
                }
            });
        };
    }

    if (!choices || choices.length === 0) return;
    
    // Inicializar flags si no existen
    gameState.flags = gameState.flags || {};
    
    choices.forEach(choice => {
        // Lógica condicional para mostrar botones
        if (choice.reqItem && !gameState.inventory.includes(choice.reqItem)) return;
        if (choice.notReqItem && gameState.inventory.includes(choice.notReqItem)) return;
        if (choice.reqFlag && !gameState.flags[choice.reqFlag]) return;
        if (choice.notReqFlag && gameState.flags[choice.notReqFlag]) return;

        const btn = document.createElement('button');
        btn.textContent = choice.text;
        btn.onclick = () => {
            if (isTyping) return;
            
            // Setear flags de la opción si existe
            if (choice.setFlag) {
                gameState.flags[choice.setFlag] = true;
            }

            simulateCommandTyping(choice.action, () => {
                let nextNodeId = choice.next;
                // Lógica de RNG
                if (choice.nextRng && Array.isArray(choice.nextRng) && choice.nextRng.length > 0) {
                    const randomIndex = Math.floor(Math.random() * choice.nextRng.length);
                    nextNodeId = choice.nextRng[randomIndex];
                }
                
                onChoiceCallback(nextNodeId);
            });
        };
        buttonContainer.appendChild(btn);
    });
}

function disableButtons() {
    const buttons = buttonContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
    if (nodeSubmit) nodeSubmit.disabled = true;
    if (nodeInput) nodeInput.disabled = true;
}

// Aplicar temas globales según la fase
function applyTheme(stage) {
    if (stage === "Trascendencia") {
        document.body.classList.add('transcendence');
    } else {
        document.body.classList.remove('transcendence');
    }
}
