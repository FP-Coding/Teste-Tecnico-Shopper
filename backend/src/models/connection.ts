import mysql, { Pool, PoolOptions } from 'mysql2/promise';

const config: PoolOptions = {
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
};

const connection: Pool = mysql.createPool(config);

export default connection;