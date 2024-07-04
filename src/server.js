/**
 * Punto principal de acceso al servidor
 */

//importación de Express
const express = require("express");

//instanciar de express
const app = express();

//importacion de modulo de rutas
const userRoutes = require("../routes/userRouter");

//Declaracion del puerto
const PORT = 3000;

//Transformacion del body a formato legible
app.use(express.json());

//dificion de un prefijo principal para las rutas
app.use("/users", userRoutes); 

// Configuración para servir archivos estáticos --AGREGADO--
app.use(express.static('public'));

//inicializamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})

//se sigue en moviesRouter...