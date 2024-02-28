import * as alt from 'alt-server';
import { savePlayerPosition, loadPlayerPosition } from './database'; // Ensure the path to database.ts file is correct.

alt.on('playerConnect', (player) => {
    alt.log(`Player ${player.id} connected.`);

    player.on('chatMessage', async (message) => {
        if (message === '/savepos') {
            const position = player.pos;
            try {
                await savePlayerPosition(player.id.toString(), position.x, position.y, position.z);
                player.emit('positionSaved');
                alt.log(`Position for player ${player.id} saved.`);
            } catch (error) {
                console.error('Error saving position:', error);
                player.emit('positionError', 'Could not save position.');
            }
        } else if (message === '/loadpos') {
            try {
                const position = await loadPlayerPosition(player.id.toString());
                if (position) {
                    player.pos = new alt.Vector3(position.posX, position.posY, position.posZ);
                    player.emit('teleportedToPosition');
                    alt.log(`Player ${player.id} teleported to saved position.`);
                } else {
                    player.emit('positionError', 'No saved position found.');
                }
            } catch (error) {
                console.error('Error loading position:', error);
                player.emit('positionError', 'Could not load position.');
            }
        }
    });
});
