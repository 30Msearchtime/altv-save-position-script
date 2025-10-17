import * as alt from '@altv/server';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Server configuration loaded from environment variables
 */
export interface Config {
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
        connectionLimit: number;
        queueLimit: number;
    };
    debug: boolean;
}

/**
 * Validates required environment variables
 */
function validateConfig(): void {
    const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

/**
 * Load and validate configuration
 */
export function loadConfig(): Config {
    try {
        validateConfig();
        
        const config: Config = {
            database: {
                host: process.env.DB_HOST!,
                port: parseInt(process.env.DB_PORT || '3306'),
                user: process.env.DB_USER!,
                password: process.env.DB_PASSWORD!,
                database: process.env.DB_NAME!,
                connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
                queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0')
            },
            debug: process.env.DEBUG_MODE === 'true'
        };
        
        alt.log('[Config] Configuration loaded successfully');
        return config;
    } catch (error) {
        alt.logError('[Config] Failed to load configuration:', error);
        throw error;
    }
}
