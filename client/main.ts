import * as alt from 'alt-client';

alt.onServer('positionSaved', () => {
  alt.log('Deine Position wurde gespeichert.');
});

alt.onServer('teleportedToPosition', () => {
  alt.log('Du wurdest zu deiner gespeicherten Position teleportiert.');
});

alt.on('keyup', (key) => {
  if (key === 0x42) { // Key 'B'
    alt.emitServer('savePosition');
  } else if (key === 0x4E) { // Key 'N'
    alt.emitServer('teleportToSavedPosition');
  }
});
