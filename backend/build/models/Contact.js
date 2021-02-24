"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var Contact = new Schema({
  email: {
    type: String
  },
  message: {
    type: String
  }
});

var _default = _mongoose["default"].model('Contact', Contact);

exports["default"] = _default;