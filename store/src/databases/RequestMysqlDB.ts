import mysql2, {Pool} from "mysql2";

const dbConfig = {
    host: "localhost",
    database : "node_request_db",
    user: "root",
    password: "67890000"
}

const DB = mysql2.createConnection(
    dbConfig
)

const DBPool = mysql2.createPool(
    dbConfig
).promise();

export const MysqlRequestDB = DB;
export const MysqlRequestPool = DBPool;