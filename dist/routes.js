"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Tweets = require('./app/controllers/Tweets'); var _Tweets2 = _interopRequireDefault(_Tweets);

const routes = new (0, _express.Router)();

routes.get('/tweets/iniciar/:hashtag', _Tweets2.default.IniciarStream);
routes.get('/tweets/parar', _Tweets2.default.PararStream);
routes.get('/tweets/reprovar/:id', _Tweets2.default.ReprovarTweet);
routes.get('/tweets/aprovar/:id', _Tweets2.default.AprovarTweet);

exports. default = routes;
