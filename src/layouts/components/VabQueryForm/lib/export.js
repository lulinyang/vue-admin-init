"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _VabQueryForm = require("../index");

var _VabQueryForm2 = _interopRequireDefault(_VabQueryForm);

var _VabQueryFormTopPanel = require("../VabQueryFormTopPanel");

var _VabQueryFormTopPanel2 = _interopRequireDefault(_VabQueryFormTopPanel);

var _VabQueryFormBottomPanel = require("../VabQueryFormBottomPanel");

var _VabQueryFormBottomPanel2 = _interopRequireDefault(
  _VabQueryFormBottomPanel
);

var _VabQueryFormLeftPanel = require("../VabQueryFormLeftPanel");

var _VabQueryFormLeftPanel2 = _interopRequireDefault(_VabQueryFormLeftPanel);

var _VabQueryFormRightPanel = require("../VabQueryFormRightPanel");

var _VabQueryFormRightPanel2 = _interopRequireDefault(_VabQueryFormRightPanel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  install: function install(Vue) {
    Vue.component("VabQueryForm", _VabQueryForm2.default);
    Vue.component("VabQueryFormLeftPanel", _VabQueryFormLeftPanel2.default);
    Vue.component("VabQueryFormRightPanel", _VabQueryFormRightPanel2.default);
    Vue.component("VabQueryFormTopPanel", _VabQueryFormTopPanel2.default);
    Vue.component("VabQueryFormBottomPanel", _VabQueryFormBottomPanel2.default);
  },
};
