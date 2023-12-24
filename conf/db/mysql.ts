import mysql, { Connection } from "mysql2";

const DATABASE_URL: string = process.env.DATABASE_URL as string;

const mysqlClient = mysql.createConnection(DATABASE_URL) as Connection;

export default mysqlClient;
