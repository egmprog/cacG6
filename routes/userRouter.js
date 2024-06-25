/**
 * Enrutador 
 * Endpoints
 */

//importar express
const express = require("express");

//instancia de express
const router = express.Router();

//importar controlador de funciones
const userController = require("../controllers/userController");

//plantear rutas-solicitudes
//para listado general:
router.get("/list", userController.getAllUsers);
//para una sola peli - forma paramétrica:
router.get("/:id", userController.getUserById);
//para crear una peli:
router.post("/create", userController.createUser);
//para modificar una peli:
router.put("/:id", userController.updateUser);
//para eliminar una peli:
router.delete("/:id", userController.deleteUser);

//exportar el enrutador
module.exports = router;

//se sigue en moviecontroller...