/**
 * Event names for client-server communication
 * Centralized to prevent typos and maintain consistency
 */
export const Events = {
    // Client to Server
    SAVE_POSITION: 'savePosition:request',
    LOAD_POSITION: 'loadPosition:request',
    
    // Server to Client
    SAVE_POSITION_RESPONSE: 'savePosition:response',
    LOAD_POSITION_RESPONSE: 'loadPosition:response',
    TELEPORT_TO_POSITION: 'teleportToPosition'
} as const;

export type EventName = typeof Events[keyof typeof Events];
