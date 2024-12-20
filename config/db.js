const mysql = require(`mysql2`)
const dotenv = require(`dotenv`)

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

db.getConnection((err, result) =>{
    if(err){
        console.log(err, `not connected`);
    } else {
        console.log(`database connected`);
    }
});

module.exports = db;