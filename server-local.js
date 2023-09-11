import express from 'express';
import serverless from 'serverless-http';
import * as fs from 'fs';
import path from 'path';
import session from 'express-session';
import router from './routes/router.js';
const api = express();
const port = process.env.PORT || 3000
//Seteamos urlencoded para capturar los datos del formulario
api.use(express.urlencoded({extended:false}));
api.use(express.json());

// Sessiooon
api.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//  Setting the Template Engine
// api.engine('pug', require('pug').__express)
api.set('view engine' , 'pug');


//  Obtener el año actual
api.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.site = 'Unfv Attendance';
  next(); // return next();
});


//  Public 
api.use(express.static('public'));


// let fi = "";

// fs.readdir('/var/task/', (err, archivos) => {
//   if (err) {
//     console.error('Error al leer el directorio:', err);
//     return;
//   }

//   console.log('Archivos en el directorio actual:');
//   archivos.forEach(archivo => {
//     fi = fi + " " + archivo; 
//   });
// });

// // Routing
// const router = Router();
router.get('/t', (req, res) => res.render('test'));
// router.get('/a', (req, res) => res.send(fi));
// router.get('/home', (req, res) => res.render('attendance'));
api.use('/', router);
api.listen(port, () => {
    console.log(`Server working on port ${port}`)
});

export const handler = serverless(api);
