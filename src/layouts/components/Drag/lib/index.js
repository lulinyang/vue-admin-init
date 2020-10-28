"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _drag = require("./drag");

var _drag2 = _interopRequireDefault(_drag);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var install = function install(Vue) {
  Vue.directive("drag", _drag2.default);
};

if (window.Vue) {
  window["drag"] = _drag2.default;
  Vue.use(install);
}

_drag2.default.install = install;
exports.default = _drag2.default;
