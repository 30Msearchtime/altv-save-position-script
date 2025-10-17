/**
 * Represents a 3D position in the game world
 */
export interface Position {
    x: number;
    y: number;
    z: number;
}

/**
 * Player position data stored in database
 */
export interface SavedPosition extends Position {
    playerId: number;
    savedAt: Date;
}

/**
 * Response structure for position operations
 */
export interface PositionResponse {
    success: boolean;
    message?: string;
    position?: Position;
}
