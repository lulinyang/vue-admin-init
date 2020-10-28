export default {
  install: function (Vue, opt) {
    //删除字符串的头尾空格
    (Vue.prototype.myTrim = function (item) {
      return item.replace(/^\s+|\s+$/gm, "");
    }),
      /*对象(删除字符串的头尾空格)*/
      (Vue.prototype.myTrimObj = function (object) {
        if (Object.prototype.toString.call(object) === "[object Array]") {
          object.forEach((item) => {
            if (
              item &&
              Object.prototype.toString.call(item) == "[object String]"
            ) {
              item = this.myTrim(item);
            } else {
              this.myTrimObj(item);
            }
          });
        } else if (
          Object.prototype.toString.call(object) === "[object Object]"
        ) {
          let keys = Object.keys(object).sort();
          for (let i in keys) {
            if (
              object[keys[i]] &&
              Object.prototype.toString.call(object[keys[i]]) ==
                "[object String]"
            ) {
              object[keys[i]] = this.myTrim(object[keys[i]]);
            } else {
              this.myTrimObj(object[keys[i]]);
            }
          }
        }
      });
    //报错提示
    Vue.prototype.notify = function (params) {
      let msg = params.message || "喝口水吧，让数据飞一会，请稍后再试";
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
  },
};
