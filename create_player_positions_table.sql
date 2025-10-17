-- Create database if not exists
CREATE DATABASE IF NOT EXISTS altv_server
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE altv_server;

-- Create player positions table
CREATE TABLE IF NOT EXISTS player_positions (
    player_id INT UNSIGNED NOT NULL PRIMARY KEY,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    z FLOAT NOT NULL,
    saved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_saved_at (saved_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add comment to table
ALTER TABLE player_positions COMMENT = 'Stores saved player positions for alt:V save position script';
