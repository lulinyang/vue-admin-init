"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = {
  bind: function bind(el, binding, vnode) {
    if (
      el.querySelector(".el-dialog__header") &&
      el.querySelector(".el-dialog")
    ) {
      var dialogHeaderEl = el.querySelector(".el-dialog__header");
      var dragDom = el.querySelector(".el-dialog");
      dialogHeaderEl.style.cssText += ";cursor:move;";
      dragDom.style.cssText += ";top:0;";

      var getStyle = (function () {
        if (window.document.currentStyle) {
          return function (dom, attr) {
            return dom.currentStyle[attr];
          };
        } else {
          return function (dom, attr) {
            return getComputedStyle(dom, false)[attr];
          };
        }
      })();

      dialogHeaderEl.onmousedown = function (e) {
        var disX = e.clientX - dialogHeaderEl.offsetLeft;
        var disY = e.clientY - dialogHeaderEl.offsetTop;

        var dragDomWidth = dragDom.offsetWidth;
        var dragDomHeight = dragDom.offsetHeight;

        var screenWidth = document.body.clientWidth;
        var screenHeight = document.body.clientHeight;

        var minDragDomLeft = dragDom.offsetLeft;
        var maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

        var minDragDomTop = dragDom.offsetTop;
        var maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

        var styL = getStyle(dragDom, "left");
        var styT = getStyle(dragDom, "top");

        if (styL.includes("%")) {
          styL = +document.body.clientWidth * (+styL / 100);
          styT = +document.body.clientHeight * (+styT / 100);
        } else {
          styL = +styL.replace(/\px/g, "");
          styT = +styT.replace(/\px/g, "");
        }

        document.onmousemove = function (e) {
          var left = e.clientX - disX;
          var top = e.clientY - disY;

          if (-left > minDragDomLeft) {
            left = -minDragDomLeft;
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft;
          }

          if (-top > minDragDomTop) {
            top = -minDragDomTop;
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop;
          }

          dragDom.style.cssText +=
            ";left:" + (left + styL) + "px;top:" + (top + styT) + "px;";

          vnode.child.$emit("drag-dialog");
        };

        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  },
};
