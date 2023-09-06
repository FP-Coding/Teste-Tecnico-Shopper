import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	host: process.env.MYSQL_HOST,
	port: Number(process.env.MYSQL_PORT),
	dialect: 'mysql',
	dialectOptions: {
		timezone: 'Z',
	},
	logging: false,
};

export = config;