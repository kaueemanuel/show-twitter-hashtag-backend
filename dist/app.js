"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _morgan = require('morgan'); var _morgan2 = _interopRequireDefault(_morgan);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);

var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _socketio = require('socket.io'); var _socketio2 = _interopRequireDefault(_socketio);

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
require('./database');

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.server = _http2.default.Server(this.app);
    this.io = _socketio2.default.call(void 0, this.server);
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
      console.log('Cennected', socket.id);
      socket.emit('init', this.estado);
    });
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.estado = this.estado;
      return next();
    });
  }

  middlewares() {
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_cors2.default.call(void 0, ));
    this.app.use(_express2.default.json());
    this.app.use(_morgan2.default.call(void 0, 'dev'));
    this.app.use(_bodyparser2.default.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use('/api', _routes2.default);
  }
}

exports. default = new App().server;
