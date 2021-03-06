import router from "@/router";
import store from "@/store";
import VabProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/pageTitle";

import { progressBar, recordRoute, routesWhiteList } from "./settings";

VabProgress.configure({
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
});

//读取缓存菜单
let menuData = JSON.parse(localStorage.getItem("menu-data")) || [];
store.dispatch("routes/setAllRoutes", menuData).then((accessRoutes) => {
  if (accessRoutes.length > 0) {
    router.addRoutes(accessRoutes);
  }
});

router.beforeResolve((to, from, next) => {
  if (progressBar) VabProgress.start();
  let accessToken = store.getters["user/accessToken"];
  if (accessToken) {
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
    if (progressBar) VabProgress.done();
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (recordRoute) {
        next(`/login?redirect=${to.path}`);
      } else {
        next("/login");
      }
      if (progressBar) VabProgress.done();
    }
  }
  document.title = getPageTitle(to.meta.title);
});
router.afterEach(() => {
  if (progressBar) VabProgress.done();
});
