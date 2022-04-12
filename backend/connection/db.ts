import { Pool } from 'pg';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  max: 50,
  allowExitOnIdle: process.env.ENV !== 'dev' ? false : true,
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
