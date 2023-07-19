//import mysql from 'mysql';
import mysql2, {Pool} from 'mysql2';

/*const dbConfig = {
    host: "felipe-mysql",
    database: "node_registration_db",
    user: "root",
    password: "67890000"
}*/

const dbConfig = {
    host: "localhost",
    database: "node_registration_db",
    user: "root",
    password: "67890000"
}
const DB = mysql2.createConnection(
    dbConfig   
)

const DBPool = mysql2.createPool(
    dbConfig
).promise()

export const MysqlDB = DB;
export const MysqlPool = DBPool;


