import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import "./plugins";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
