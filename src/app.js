import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import http from 'http';
import socketio from 'socket.io';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.io = socketio(this.server);
    this.middlewares();
    this.websockets();
    this.routes();
    this.estado = {
      monitorando: false,
      hashtag: '',
      tweets: [],
      tweetsAprovados: [],
      tweetsReprovados: [],
    };
  }

  websockets() {
    this.io.on('connection', socket => {
      console.log('Connected', socket.id);
      socket.emit('init', this.estado);
    });
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.estado = this.estado;
      return next();
    });
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger('dev'));
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use('/api', routes);
  }
}

export default new App().server;
