// Importación del módulo mysql2
const mysql = require("mysql2");

// Objeto de configuración para la base de datos
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
});

// Conectar con la base de datos
connection.connect((error) => {
    if (error) {
        console.log("Error de conexión con la base de datos: " + error);
        return;
    } else {
        console.log("Conectado a la base de datos");
    }
});

// Verificación de la base de datos
const sql = 'CREATE DATABASE IF NOT EXISTS users_db';

connection.query(sql, (err, result) => {
    if (err) {
        console.error('Error al crear la base de datos:', err);
        return;
    }
    console.log('Base de datos creada o existente');

    // Ubicación en la BD
    connection.changeUser({ database: 'users_db' }, (err) => {
        if (err) {
            console.error('Error al cambiar la base de datos:', err);
            return;
        }

        // Creación de la tabla 'users'
        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(255),
                password VARCHAR(255) NOT NULL,
                rol INT NOT NULL,
                post INT NOT NULL,
                country INT NOT NULL,
                FOREIGN KEY (rol) REFERENCES roles(rol_id),
                FOREIGN KEY (post) REFERENCES post(post_id),
                FOREIGN KEY (country) REFERENCES countrys(country_id)
            );
        `;

        // Creación de la tabla 'roles'
        const createRolesTableQuery = `
            CREATE TABLE IF NOT EXISTS roles (
                rol_id INT AUTO_INCREMENT PRIMARY KEY,
                rol VARCHAR(255) NOT NULL
            );
        `;

        // Creación de la tabla 'post'
        const createPostTableQuery = `
            CREATE TABLE IF NOT EXISTS post (
                post_id INT AUTO_INCREMENT PRIMARY KEY,
                post VARCHAR(255) NOT NULL
            );
        `;

        // Creación de la tabla 'countrys'
        const createCountrysTableQuery = `
            CREATE TABLE IF NOT EXISTS countrys (
                country_id INT AUTO_INCREMENT PRIMARY KEY,
                country VARCHAR(255) NOT NULL
            );
        `;

        // Ejecutar las consultas para crear las tablas
        connection.query(createRolesTableQuery, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla roles:', err);
                return;
            }
            console.log('Tabla roles creada o existente');
        });

        connection.query(createPostTableQuery, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla post:', err);
                return;
            }
            console.log('Tabla post creada o existente');
        });

        connection.query(createCountrysTableQuery, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla countrys:', err);
                return;
            }
            console.log('Tabla countrys creada o existente');
        });

        connection.query(createUsersTableQuery, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla users:', err);
                return;
            }
            console.log('Tabla users creada o existente');
        });
    });
});

// Exportar la base de datos
module.exports = connection;
