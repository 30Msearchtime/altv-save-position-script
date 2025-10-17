import * as alt from '@altv/server';
import mysql from 'mysql2/promise';
import { loadConfig } from './config.js';
import type { Position, SavedPosition } from '../shared/types.js';

/**
 * Database manager with connection pooling
 */
class DatabaseManager {
    private pool: mysql.Pool | null = null;
    private config = loadConfig();

    /**
     * Initialize database connection pool
     */
    async init(): Promise<void> {
        try {
            this.pool = mysql.createPool({
                host: this.config.database.host,
                port: this.config.database.port,
                user: this.config.database.user,
                password: this.config.database.password,
                database: this.config.database.database,
                connectionLimit: this.config.database.connectionLimit,
                queueLimit: this.config.database.queueLimit,
                waitForConnections: true,
                enableKeepAlive: true,
                keepAliveInitialDelay: 0
            });

            // Test connection
            const connection = await this.pool.getConnection();
            alt.log('[Database] Connection pool initialized successfully');
            connection.release();
        } catch (error) {
            alt.logError('[Database] Failed to initialize connection pool:', error);
            throw error;
        }
    }

    /**
     * Save player position to database
     */
    async savePosition(playerId: number, position: Position): Promise<boolean> {
        if (!this.pool) {
            throw new Error('Database not initialized');
        }

        try {
            const query = `
                INSERT INTO player_positions (player_id, x, y, z, saved_at)
                VALUES (?, ?, ?, ?, NOW())
                ON DUPLICATE KEY UPDATE 
                    x = VALUES(x),
                    y = VALUES(y),
                    z = VALUES(z),
                    saved_at = NOW()
            `;

            await this.pool.execute(query, [
                playerId,
                position.x,
                position.y,
                position.z
            ]);

            if (this.config.debug) {
                alt.log(`[Database] Saved position for player ${playerId}`);
            }

            return true;
        } catch (error) {
            alt.logError('[Database] Failed to save position:', error);
            return false;
        }
    }

    /**
     * Load player position from database
     */
    async loadPosition(playerId: number): Promise<SavedPosition | null> {
        if (!this.pool) {
            throw new Error('Database not initialized');
        }

        try {
            const query = `
                SELECT player_id as playerId, x, y, z, saved_at as savedAt
                FROM player_positions
                WHERE player_id = ?
                LIMIT 1
            `;

            const [rows] = await this.pool.execute(query, [playerId]);
            const positions = rows as SavedPosition[];

            if (positions.length === 0) {
                return null;
            }

            if (this.config.debug) {
                alt.log(`[Database] Loaded position for player ${playerId}`);
            }

            return positions[0];
        } catch (error) {
            alt.logError('[Database] Failed to load position:', error);
            return null;
        }
    }

    /**
     * Close database connection pool
     */
    async close(): Promise<void> {
        if (this.pool) {
            await this.pool.end();
            alt.log('[Database] Connection pool closed');
        }
    }
}

// Export singleton instance
export const database = new DatabaseManager();
