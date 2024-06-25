/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos 
 */

//importar el modelo - modulo db
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.
const db = require("../db/db");

//metodo para obtener todas la peliculas - getAllMovies
const getAllUsers = (req, res) => {
    //encontrar todas las peliculas, creando una consulta SQL
    const sql = "SELECT * FROM users";
    //envio de la consulta a la BD
    db.query(sql, (error, result) => {
        //si hay error, lo imprimo por consola
        if (error) {throw error};
        //si no hay error:
        res.json(result);          
    });
};

//metodo para obtener una sola peli - getMovieById
const getUserById = (req, res) => {
    //obtener la id - desestructuracion del objeto req.params
    const {id} = req.params;
    //encontrar una sola peli, creando una consulta SQL
    //? es un marcador de posición para el id
    const sql = 'SELECT * FROM users WHERE id = ?';
    //envio de la consulta a la BD
    db.query(sql, [id], (error, result) => {
        //si hay error, lo imprimo por consola
        if (error) {throw error};
        //si no hay error:
        res.json(result);          
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
    //desestructuracion del objeto req.body
    const {id} = req.params;
    const {name, email, phone, password, rol, post, country} = req.body;
    //encontrar una sola peli, creando una consulta SQL
    const sql = 'UPDATE users SET name = ?, email = ?, phone = ?, password = ?, rol = ?, post = ?, country = ? WHERE id = ?';
    //envio de la consulta a la BD
    db.query(sql, [name, email, phone, password, rol, post, country, id], (error, result) => {
        //si hay error, lo imprimo por consola
        if (error) {throw error};
        //si no hay error:
        res.json({mensaje: "Usuario actualizado con exito"});
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