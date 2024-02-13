import * as alt from 'alt-server';
import { savePlayerPosition, loadPlayerPosition } from './database'; // Stelle sicher, dass der Pfad zur database.ts Datei korrekt ist.

alt.on('playerConnect', (player) => {
    alt.log(`Player ${player.id} connected.`);

    player.on('chatMessage', async (message) => {
        if (message === '/savepos') {
            const position = player.pos;
            try {
                await savePlayerPosition(player.id.toString(), position.x, position.y, position.z);
                player.emit('positionSaved');
                alt.log(`Position für Spieler ${player.id} gespeichert.`);
            } catch (error) {
                console.error('Fehler beim Speichern der Position:', error);
                player.emit('positionError', 'Position konnte nicht gespeichert werden.');
            }
        } else if (message === '/loadpos') {
            try {
                const position = await loadPlayerPosition(player.id.toString());
                if (position) {
                    player.pos = new alt.Vector3(position.posX, position.posY, position.posZ);
                    player.emit('teleportedToPosition');
                    alt.log(`Spieler ${player.id} zu gespeicherter Position teleportiert.`);
                } else {
                    player.emit('positionError', 'Keine gespeicherte Position gefunden.');
                }
            } catch (error) {
                console.error('Fehler beim Laden der Position:', error);
                player.emit('positionError', 'Position konnte nicht geladen werden.');
            }
        }
    });
});
