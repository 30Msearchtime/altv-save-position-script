import * as alt from 'alt-client';

alt.onServer('positionSaved', () => {
  alt.log('Deine Position wurde gespeichert.');
});

alt.onServer('teleportedToPosition', () => {
  alt.log('Du wurdest zu deiner gespeicherten Position teleportiert.');
});

alt.onServer('positionError', (message: string) => {
  alt.log(message);
});
