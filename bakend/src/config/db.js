import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DAC.gatos3*+",
    database: "productos",
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos: " + err);
        return;
    }
    console.log("Conectado a la base de datos");
});

export default db;