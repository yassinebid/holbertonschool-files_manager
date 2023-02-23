import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const express = require('express');

const router = (app) => {
  const path = express.Router();
  app.use(express.json());
  app.use('/', path);

  path.get('/status', ((req, res) => AppController.getStatus(req, res)));
  path.get('/stats', ((req, res) => AppController.getStats(req, res)));
  path.post('/users', ((req, res) => UsersController.postNew(req, res)));
  path.get('/connect', ((req, res) => AuthController.getConnect(req, res)));
  path.get('/disconnect', ((req, res) => AuthController.getDisconnect(req, res)));
  path.get('/users/me', ((req, res) => UsersController.getMe(req, res)));
  path.get('/files/:id', ((req, res) => FilesController.getShow(req, res)));
  path.get('/files', ((req, res) => FilesController.getIndex(req, res)));
  path.put('/files/:id/publish', ((req, res) => FilesController.putPublish(req, res)));
  path.put('/files/:id/unpublish', ((req, res) => FilesController.putUnpublish(req, res)));
  path.get('/files/:id/data', ((req, res) => FilesController.getFile(req, res)));
};

export default router;