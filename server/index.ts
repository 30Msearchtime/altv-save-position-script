import * as alt from '@altv/server';
import { database } from './database.js';
import { Events } from '../shared/events.js';
import type { Position, PositionResponse } from '../shared/types.js';

/**
 * Initialize the save position resource
 */
async function init(): Promise<void> {
    try {
        // Initialize database
        await database.init();
        
        alt.log('[SavePosition] Resource initialized successfully');
    } catch (error) {
        alt.logError('[SavePosition] Failed to initialize resource:', error);
        throw error;
    }
}

/**
 * Handle save position request from client
 */
alt.onClient(Events.SAVE_POSITION, async (player: alt.Player) => {
    try {
        if (!player.valid) {
            return;
        }

        // Get player position
        const position: Position = {
            x: player.pos.x,
            y: player.pos.y,
            z: player.pos.z
        };

        // Save to database
        const success = await database.savePosition(player.id, position);

        // Send response to client
        const response: PositionResponse = {
            success,
            message: success 
                ? 'Position saved successfully!' 
                : 'Failed to save position. Please try again.'
        };

        player.emitRaw(Events.SAVE_POSITION_RESPONSE, response);

        if (success) {
            alt.log(`[SavePosition] Player ${player.name} (${player.id}) saved position`);
        }
    } catch (error) {
        alt.logError('[SavePosition] Error handling save request:', error);
        
        const response: PositionResponse = {
            success: false,
            message: 'An error occurred while saving your position.'
        };
        
        if (player.valid) {
            player.emitRaw(Events.SAVE_POSITION_RESPONSE, response);
        }
    }
});

/**
 * Handle load position request from client
 */
alt.onClient(Events.LOAD_POSITION, async (player: alt.Player) => {
    try {
        if (!player.valid) {
            return;
        }

        // Load from database
        const savedPosition = await database.loadPosition(player.id);

        if (!savedPosition) {
            const response: PositionResponse = {
                success: false,
                message: 'No saved position found. Use /savepos first!'
            };
            
            player.emitRaw(Events.LOAD_POSITION_RESPONSE, response);
            return;
        }

        // Extract position
        const position: Position = {
            x: savedPosition.x,
            y: savedPosition.y,
            z: savedPosition.z
        };

        // Send response with position data
        const response: PositionResponse = {
            success: true,
            message: 'Teleporting to saved position...',
            position
        };

        player.emitRaw(Events.LOAD_POSITION_RESPONSE, response);
        
        alt.log(`[SavePosition] Player ${player.name} (${player.id}) loaded position`);
    } catch (error) {
        alt.logError('[SavePosition] Error handling load request:', error);
        
        const response: PositionResponse = {
            success: false,
            message: 'An error occurred while loading your position.'
        };
        
        if (player.valid) {
            player.emitRaw(Events.LOAD_POSITION_RESPONSE, response);
        }
    }
});

/**
 * Handle resource stop
 */
alt.on('resourceStop', async () => {
    await database.close();
    alt.log('[SavePosition] Resource stopped');
});

// Initialize resource
init().catch(error => {
    alt.logError('[SavePosition] Fatal error during initialization:', error);
});
