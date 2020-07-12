"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const TweetSchema = new _mongoose2.default.Schema({
  hashtag: {
    type: String,
    trim: true,
    required: true,
  },
  nome: {
    type: String,
    trim: true,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  },
});

exports. default = _mongoose2.default.model('Tweet', TweetSchema);
