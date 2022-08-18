// Versión commonJS
// Importar express
// const express = require('express');

// Versión Import
import express from 'express';

// Importar Router - importar con la extension
import router from './routes/index.js';

// Importar Base de Datos
import db from './config/db.js';

// Conectar la Base de Datos
db.authenticate()
    .then(() => console.log('Conectado'))
    .catch(error => console.log(error));

// En package.json decirle que cargue con "type": "module"

// Ejecutamos como función y la asignamos a una variable
const app = express();

// Definir puerto con una variable de entorno donde el servidor donde se haga el deployment te da el puerto
const port = process.env.PORT || 4000;

// Arrancar el servidor
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
});

// Habilitar pug
app.set('view engine', 'pug');

/* ***** PROPIAS FUNCIONES ***** */

// Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();

    res.locals.nombreSitio = 'Agencias de Viajes';

    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded( { extended: true }));



// Agregar router
app.use('/', router);

// Definir la carpeta public
app.use(express.static('public'));