import express, { Router } from 'express';
import serverless from 'serverless-http';
// const fs = require('fs');

const api = express();

//  Setting the Template Engine
// api.engine('pug', require('pug').__express)
api.set('view engine' , 'pug');

// Routing
const router = Router();
// router.get('/', (req, res) => res.send(fi));
router.get('/', (req, res) => res.render('login'));
router.get('/fhgf', (req, res) => res.render('login'));

api.use('/', router);

export const handler = serverless(api);
