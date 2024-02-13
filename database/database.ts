import { createPool } from 'mysql2/promise';
import config from './config.json';

const pool = createPool(config.database);

export const savePlayerPosition = async (playerID: string, posX: number, posY: number, posZ: number) => {
  const query = 'INSERT INTO PlayerPositions (playerID, posX, posY, posZ) VALUES (?, ?, ?, ?)';
  await pool.execute(query, [playerID, posX, posY, posZ]);
};

export const loadPlayerPosition = async (playerID: string): Promise<any> => {
  const query = 'SELECT posX, posY, posZ FROM PlayerPositions WHERE playerID = ? ORDER BY createdAt DESC LIMIT 1';
  const [rows]: [any[], any] = await pool.execute(query, [playerID]);

  if (rows.length > 0) {
    return rows[0];
  }

  return null;
};
