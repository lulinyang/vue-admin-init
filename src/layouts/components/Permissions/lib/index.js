"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _permissions = require("./permissions");

var _permissions2 = _interopRequireDefault(_permissions);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var install = function install(Vue) {
  Vue.directive("permissions", _permissions2.default);
};

if (window.Vue) {
  window["permissions"] = _permissions2.default;
  Vue.use(install);
}

_permissions2.default.install = install;
exports.default = _permissions2.default;
