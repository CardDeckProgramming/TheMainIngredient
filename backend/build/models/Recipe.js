"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var Recipe = new Schema({
  author: {
    type: String
  },
  title: {
    type: String
  },
  type: {
    type: String
  },
  ingredients: {
    type: []
  },
  steps: {
    type: []
  },
  reviews: {
    type: []
  }
});

var _default = _mongoose["default"].model('Recipe', Recipe);

exports["default"] = _default;