import * as alt from '@altv/client';
import * as native from '@altv/natives';
import { Events } from '../shared/events.js';
import type { PositionResponse } from '../shared/types.js';

/**
 * Display notification to player
 */
function showNotification(message: string): void {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    native.endTextCommandThefeedPostTicker(false, true);
}

/**
 * Handle /savepos command
 */
alt.on('consoleCommand', (command: string) => {
    if (command === 'savepos') {
        alt.emitServerRaw(Events.SAVE_POSITION);
        showNotification('~y~Saving position...');
    }
});

/**
 * Handle /loadpos command
 */
alt.on('consoleCommand', (command: string) => {
    if (command === 'loadpos') {
        alt.emitServerRaw(Events.LOAD_POSITION);
        showNotification('~y~Loading position...');
    }
});

/**
 * Handle save position response from server
 */
alt.onServer(Events.SAVE_POSITION_RESPONSE, (response: PositionResponse) => {
    if (response.success) {
        showNotification(`~g~${response.message}`);
    } else {
        showNotification(`~r~${response.message}`);
    }
});

/**
 * Handle load position response from server
 */
alt.onServer(Events.LOAD_POSITION_RESPONSE, (response: PositionResponse) => {
    if (response.success && response.position) {
        // Teleport player to position
        const localPlayer = alt.Player.local;
        const { x, y, z } = response.position;
        
        // Fade out screen for smooth transition
        native.doScreenFadeOut(500);
        
        alt.setTimeout(() => {
            // Set player position
            native.setEntityCoords(localPlayer, x, y, z, false, false, false, false);
            
            // Fade in screen
            native.doScreenFadeIn(500);
            
            showNotification(`~g~${response.message}`);
        }, 500);
    } else {
        showNotification(`~r~${response.message}`);
    }
});

alt.log('[SavePosition] Client-side initialized');
