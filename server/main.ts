import * as alt from 'alt-server';

interface PlayerPosition {
  x: number;
  y: number;
  z: number;
}

const playerPositions: Record<string, PlayerPosition> = {};

alt.on('playerConnect', (player) => {
  playerPositions[player.id] = { x: 0, y: 0, z: 0 };
  alt.log(`Player ${player.id} connected.`);
});

alt.onClient('savePosition', (player) => {
  const position = player.pos;
  playerPositions[player.id] = { x: position.x, y: position.y, z: position.z };
  player.emit('positionSaved');
});

alt.onClient('teleportToSavedPosition', (player) => {
  const position = playerPositions[player.id];
  if (position) {
    player.pos = new alt.Vector3(position.x, position.y, position.z);
    player.emit('teleportedToPosition');
  }
});
