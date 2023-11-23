import * as alt from 'alt-server';

interface PlayerPosition {
  x: number;
  y: number;
  z: number;
}

const playerPositions: Map<number, PlayerPosition> = new Map();

alt.on('playerConnect', (player) => {
  playerPositions.set(player.id, null);
  alt.log(`Player ${player.id} connected.`);

  player.on('chatMessage', (message) => {
    if (message === '/savepos') {
      const position = player.pos;
      playerPositions.set(player.id, { x: position.x, y: position.y, z: position.z });
      player.emit('positionSaved');
    } else if (message === '/loadpos') {
      const position = playerPositions.get(player.id);
      if (!position) {
        player.emit('positionError', 'Keine gespeicherte Position gefunden.');
        return;
      }

      player.pos = new alt.Vector3(position.x, position.y, position.z);
      player.emit('teleportedToPosition');
    }
  });
});

alt.onClient('savePosition', (player) => {
  const position = player.pos;
  playerPositions.set(player.id, { x: position.x, y: position.y, z: position.z });
  player.emit('positionSaved');
});

alt.onClient('teleportToSavedPosition', (player) => {
  const position = playerPositions.get(player.id);
  if (!position) {
    player.emit('positionError', 'Keine gespeicherte Position gefunden.');
    return;
  }

  player.pos = new alt.Vector3(position.x, position.y, position.z);
  player.emit('teleportedToPosition');
});
