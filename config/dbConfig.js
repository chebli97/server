import {Sequelize} from "sequelize"
// Database Connection

const database = new Sequelize('livri-db', process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
})


database.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

export default database