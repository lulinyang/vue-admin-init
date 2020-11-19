export default {
  install: function (Vue, opt) {
    //报错提示
    Vue.prototype.notify = function (params) {
      let msg =
        params.msg || params.message || "喝口水吧，让数据飞一会，请稍后再试";
      let title = params.title || "提示";
      let type = params.type || "success";
      this.$message({
        message: msg,
        title: title,
        type: type,
      });
    };

    /**
     * 格式化时间
     * Y${symbol}m${symbol}d H:i:s
     * Y${symbol}m${symbol}d H:i
     * Y${symbol}m${symbol}d
     * Y${symbol}m
     */
    Vue.prototype.formatTime = (timestamp, format) => {
      const formatNumber = (n) => {
        n = n.toString();
        return n[1] ? n : "0" + n;
      };
      if (!timestamp) {
        const date = new Date();
        const year = date.getFullYear();
        const month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return year + "-" + month + "-" + day;
      }
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      if (!format) {
        return year + "年" + month + "月" + day + "日";
      }
      let symbol = format.substr(1, 1);
      if (format === `Y${symbol}m${symbol}d H:i:s`) {
        return (
          [year, month, day].map(formatNumber).join(symbol) +
          " " +
          [hour, minute, second].map(formatNumber).join(":")
        );
      } else if (format === `Y${symbol}m${symbol}d H:i`) {
        return (
          [year, month, day].map(formatNumber).join(symbol) +
          " " +
          [hour, minute].map(formatNumber).join(":")
        );
      } else if (format === `Y${symbol}m${symbol}d`) {
        return [year, month, day].map(formatNumber).join(symbol);
      } else if (format === `Y${symbol}m`) {
        return [year, month].map(formatNumber).join(symbol);
      } else if (format === `m${symbol}d H:i`) {
        let now = new Date();
        if (
          now.getFullYear() == year &&
          now.getMonth() + 1 == month &&
          now.getDate() == day
        ) {
          return "今天" + " " + [hour, minute].map(formatNumber).join(":");
        }
        return (
          [month, day].map(formatNumber).join(symbol) +
          " " +
          [hour, minute].map(formatNumber).join(":")
        );
      }
      {
        return year + "年" + month + "月" + day + "日";
      }
    };

    Vue.prototype.myTrim = (str, type) => {
      let newStr = "";
      if (type == "all") {
        newStr = str.replace(/\s*/g, "");
      } else if (type == "left") {
        newStr = str.replace(/^\s*/, "");
      } else if (type == "right") {
        newStr = str.replace(/^\s*/, "");
      } else {
        newStr = str.replace(/(\s*$)/g, "");
      }
      return newStr;
    };

    Vue.prototype.deepClone = (obj) => {
      function isArray(arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
      }
      // 对常见的“非”值，直接返回原来值
      if ([null, undefined, NaN, false].includes(obj)) return obj;
      if (typeof obj !== "object" && typeof obj !== "function") {
        //原始类型直接返回
        return obj;
      }
      var o = isArray(obj) ? [] : {};
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          o[i] =
            typeof obj[i] === "object"
              ? Vue.prototype.deepClone(obj[i])
              : obj[i];
        }
      }
      return o;
    };
  },
};
