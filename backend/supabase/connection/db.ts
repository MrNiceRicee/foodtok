import { Pool } from 'pg';

interface Config {
  user?: string;
  password: string;
  database: string;
  host: string;
  max: number;
  port: number;
  allowExitOnIdle: boolean;
}

const config: Config = {
  user: import.meta.env.VITE_DB_USER || process.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD || process.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_DATABASE || process.env.VITE_DB_DATABASE,
  host: import.meta.env.VITE_DB_HOST || process.env.VITE_DB_HOST,
  port: import.meta.env.VITE_DB_PORT || +process.env.VITE_DB_PORT,
  max: 50,
  allowExitOnIdle: import.meta.env.ENV !== 'dev' ? false : true,
};

const pool = new Pool(config);

/**
 * SQL statement expecting only one result
 */
const queryOne = async (text: string, values: Array<any>) => {
  const result = await pool.query(text, values);
  return result?.rows?.[0];
};

/**
 * SQL statement expecting multiple results
 */
const queryRows = async (text: string, values: Array<any>) => {
  const result = await pool.query(text, values);
  return result?.rows;
};

/**
 * SQL statement based on pg query
 * @returns pg SQL return statement
 */
const query = async (text: string, values: Array<any>) =>
  pool.query(text, values);

const getClient = async () => await pool.connect();

export { query, queryOne, queryRows, getClient };
