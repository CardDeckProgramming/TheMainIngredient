"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var Account = new Schema({
  first: {
    type: String
  },
  last: {
    type: String
  },
  gender: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  bio: {
    type: String,
    "default": ''
  },
  recipes: {
    type: []
  },
  follows: {
    type: []
  },
  reviews: {
    type: []
  }
});

var _default = _mongoose["default"].model('Account', Account);

exports["default"] = _default;