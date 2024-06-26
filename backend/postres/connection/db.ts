import { Pool } from 'pg';

interface config {
  user?: string;
  password: string;
  database: string;
  max: number;
  allowExitOnIdle: boolean;
}

const config: config = {
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_DATABASE,
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
