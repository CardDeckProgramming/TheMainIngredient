"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var Review = new Schema({
  title: {
    type: String
  },
  recipeBy: {
    type: String
  },
  score: {
    type: String
  },
  review: {
    type: String
  },
  reviewBy: {
    type: String
  }
});

var _default = _mongoose["default"].model('Review', Review);

exports["default"] = _default;