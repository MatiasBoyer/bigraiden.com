import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

let pool;

/**
 * Gets a new DB pool using the configured .env variables
 * @returns {Promise<import('mysql2/promise').Pool>}
 */
async function GetPool() {
  if (pool) return pool;

  let conf = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT || "10"),
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };

  try {
    pool = await mysql.createPool(conf);
    const conn = await pool.getConnection();
    conn.release();
    return pool;
  } catch (err) {
    console.error("Error creating MySQL pool:", err);
    return undefined;
  }
}

/**
 * Drops the existing pool
 * @param {Promise<import('mysql2/promise').Pool>} pool
 */
async function DropPool(pool) {
  return (await pool).end();
}

/**
 * Gets a new DB connection using the configured .env variables
 * @param {import('mysql2/promise').Pool} pool db
 * @returns {Promise<import('mysql2/promise').PoolConnection>}
 */
async function GetConnection(pool) {
  return await pool.getConnection();
}

/**
 * Drops the existing connection
 * @param {import('mysql2/promise').PoolConnection} connection
 */
async function DropConnection(connection) {
  return connection.release();
}

/**
 * @param {import('mysql2/promise').PoolConnection} connection
 * @param {string} query
 * @param {{ params?: any[], filters?: Object }} options
 */
async function priv__exec(
  connection,
  query,
  { params = [], filters = {} } = {}
) {
  try {
    if (filters) {
      const filter_keys = Object.keys(filters);

      for (let i = 0; i < filter_keys.length; i++) {
        const key = filter_keys[i];
        const text = "-- %" + key + "%";

        query = query.replace(text, filters[key]);
      }
    }

    const [rows] = await connection.execute(query, params);
    return rows;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

/**
 * Executes a query, using the specified params
 * @param {import('mysql2/promise').PoolConnection} connection to the db
 * @param {string} query to execute in SQL
 * @param {{ params?: any[], filters?: Object }} options
 * @returns
 */
async function ExecQuery(
  connection,
  query,
  { params = [], filters = {} } = {}
) {
  return priv__exec(connection, query, { params: params, filters: filters });
}

/**
 * Executes a query file, using the specified params
 * @param {import('mysql2/promise').PoolConnection} connection to the db
 * @param {string} file to read and execute in SQL
 * @param {{ params?: any[], filters?: Object }} options
 * @returns
 */
async function ExecFile(connection, file, { params = [], filters = {} } = {}) {
  const fpath = path.join(__dirname, file);
  if (!fs.existsSync(fpath)) throw new Error("db file does not exist");

  const query = fs.readFileSync(fpath, { encoding: "utf8", flag: "r" });
  return priv__exec(connection, query, { params: params, filters: filters });
}

export default {
  GetPool,
  DropPool,
  GetConnection,
  DropConnection,
  ExecQuery,
  ExecFile,
};
