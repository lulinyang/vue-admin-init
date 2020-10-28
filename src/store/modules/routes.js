import { constantRoutes } from "@/router";
import { asyncRoutes } from "@/router/menus";
import { convertRouter } from "@/utils/handleRoutes";

const state = { routes: [], partialRoutes: [] };
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
};
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes);
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes);
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes);
  },
};
const actions = {
  async setRoutes({ commit }) {
    commit("setRoutes", asyncRoutes);
    return asyncRoutes;
  },
  async setAllRoutes({ commit }, data) {
    if (data.length > 0 && data[data.length - 1].path != "*") {
      data.push({ path: "*", redirect: "/404", hidden: true });
    }
    let accessRoutes = convertRouter(data);
    commit("setAllRoutes", accessRoutes);
    return accessRoutes;
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit("setPartialRoutes", accessRoutes);
    return accessRoutes;
  },
};
export default { state, getters, mutations, actions };
