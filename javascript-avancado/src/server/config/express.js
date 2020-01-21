/* Código simplório, apenas para fornecer o serviço para a aplicação */

import express, { static } from 'express';
var app = express();
import routes from '../app/routes';
import { join } from 'path';
import { json } from 'body-parser';

app.set('clientPath', join(__dirname, '../..', 'client'));
console.log(app.get('clientPath'));
app.use(static(app.get('clientPath')));
app.use(json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


routes(app);

export default app;