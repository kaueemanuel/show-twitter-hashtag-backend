"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _requiredir = require('require-dir'); var _requiredir2 = _interopRequireDefault(_requiredir);

_mongoose2.default.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

_requiredir2.default.call(void 0, '../app/models');

exports. default = _mongoose2.default;
