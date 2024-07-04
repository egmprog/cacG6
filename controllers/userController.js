/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos 
 */

//importar el modelo - modulo db
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.
const db = require("../db/db");

//metodo para obtener todos los usuarios - getAllUsers


/* ---- */
const connection = require('../db/db');

const getAllUsers = (req, res) => {
    const query = `
        SELECT 
            u.id,
            u.name, 
            u.email, 
            u.phone, 
            p.post, 
            c.country, 
            r.rol
        FROM 
            users u
        LEFT JOIN 
            roles r ON u.rol = r.rol_id
        LEFT JOIN 
            countrys c ON u.country = c.country_id
        LEFT JOIN 
            post p ON u.post = p.post_id;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios:', err);
            res.status(500).send('Error al obtener los usuarios');
        } else {
            res.json(results);
        }
    });
};



/* ---- */



//metodo para obtener un usuario - getUserById
const getUserById = (req, res) => {
    const userId = req.params.id;
    const query = `
        SELECT 
            u.id,
            u.name, 
            u.email, 
            u.phone, 
            r.rol, 
            p.post, 
            c.country
        FROM 
            users u
        LEFT JOIN 
            roles r ON u.rol = r.rol_id
        LEFT JOIN 
            countrys c ON u.country = c.country_id
        LEFT JOIN 
            post p ON u.post = p.post_id
        WHERE 
            u.id = ?;
    `;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).send('Error al obtener el usuario');
        } else if (results.length === 0) {
            res.status(404).send('Usuario no encontrado');
        } else {
            res.json(results[0]);
        }
    });
};

//metodo para crear un usuario- createUser
const createUser = (req, res) => {
    //desestructuracion del objeto req.body
    const {name, email, phone, password, rol, post, country} = req.body;    
    //encontrar una sola peli, creando una consulta SQL
    const sql = 'INSERT INTO users (name, email, phone, password, rol, post, country) VALUES (?, ?, ?, ?, ?, ?, ?)';
    //envio de la consulta a la BD
    db.query(sql, [name, email, phone, password, rol, post, country], (error, result) => {
        //si hay error, lo imprimo por consola
        if (error) {throw error};
        //si no hay error:
        res.json({mensaje: "Usuario creado con exito"});
    });
};

//metodo para modificar un usuario - updateUser
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email, phone, password, rol, post, country } = req.body;
    const query = `
        UPDATE users 
        SET 
            name = ?, 
            email = ?, 
            phone = ?, 
            password = ?, 
            rol = (SELECT rol_id FROM roles WHERE rol = ?), 
            post = (SELECT post_id FROM post WHERE post = ?), 
            country = (SELECT country_id FROM countrys WHERE country = ?)
        WHERE id = ?;
    `;

    connection.query(query, [name, email, phone, password, rol, post, country, userId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            res.status(500).send('Error al actualizar el usuario');
        } else {
            res.send('Usuario actualizado con éxito');
        }
    });
};

//metodo para borrar un usuario - deleteUser
const deleteUser = (req, res) => {
    //desestructuracion del objeto req.body
    const {id} = req.params;
    //encontrar una sola peli, creando una consulta SQL
    const sql = 'DELETE FROM users WHERE id = ?';
    //envio de la consulta a la BD
    db.query(sql, [id], (error, result) => {
        //si hay error, lo imprimo por consola
        if (error) {throw error};
        //si no hay error:
        res.json({mensaje: "Usuario borrado con exito"});
    });
};

//Exportar los metodos
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser    
}