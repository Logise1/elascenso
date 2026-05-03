const SAVE_PREFIX = 'el_ascenso_save_';

// Función para obtener los datos de guardado de un slot
function getSaveData(slotIndex) {
    const data = localStorage.getItem(SAVE_PREFIX + slotIndex);
    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error("Error leyendo el guardado", e);
            return null;
        }
    }
    return null;
}

// Función para guardar el estado del juego
function saveGame(slotIndex, state) {
    state.lastSaved = new Date().toLocaleString('es-ES');
    localStorage.setItem(SAVE_PREFIX + slotIndex, JSON.stringify(state));
    showAutoSaveIndicator();
}

// Función para borrar todos los datos de guardado
function deleteAllSaves() {
    localStorage.removeItem(SAVE_PREFIX + 1);
    localStorage.removeItem(SAVE_PREFIX + 2);
    localStorage.removeItem(SAVE_PREFIX + 3);
}

// Animación temporal para indicar autoguardado
function showAutoSaveIndicator() {
    const indicator = document.getElementById('auto-save-indicator');
    if(indicator) {
        indicator.style.opacity = '1';
        setTimeout(() => {
            indicator.style.opacity = '0.1';
        }, 2000);
    }
}
