"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _store = require("@/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  inserted: function inserted(el, binding) {
    var value = binding.value;

    var permissions = _store2.default.getters["user/permissions"];

    if (value && value instanceof Array && value.length > 0) {
      var hasPermission = permissions.some(function (role) {
        return value.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
};
