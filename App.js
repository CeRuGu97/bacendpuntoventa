import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import CONTROLLER_ROUTES from './ControllerRoutes.js';
import { ensureAuthenticated } from './core/middleware/middleware.js';

let app = express();
let port = process.env.port || 3000;

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(express.static("public"));
app.use(cors());

CONTROLLER_ROUTES.forEach(route => {
  let router = Router();
  router.use(ensureAuthenticated);
  let controller = route.controller.make(router);
  controller.applyRoutes();
  app.use(`/api/v1/${route.endpoint}`, router);
});

app.listen(port, () => {
  let dateTime = new Date();
  let message = `${dateTime} - Server running on port: ${port}`;
  console.log(message);
});

export default app;
