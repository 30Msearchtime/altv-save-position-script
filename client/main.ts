import * as alt from 'alt-client';

alt.onServer('positionSaved', () => {
    alt.log('Your position has been saved.');
});

alt.onServer('teleportedToPosition', () => {
    alt.log('You have been teleported to your saved position.');
});

alt.onServer('positionError', (message: string) => {
    alt.log(message);
});
