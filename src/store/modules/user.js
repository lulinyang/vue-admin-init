import VueCookies from "vue-cookies";
const state = {
  accessToken: VueCookies.get("accessToken") || "",
  username: VueCookies.get("username") || "admin",
  avatar:
    VueCookies.get("avatar") ||
    "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif",
  router: "",
};
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  router: (state) => state.router,
};

const mutations = {
  setAccessToken(state, accessToken) {
    VueCookies.set("accessToken", accessToken, "0");
    state.accessToken = accessToken;
  },
  setUsername(state, username) {
    VueCookies.set("username", username, "0");
    state.username = username;
  },
  setAvatar(state, avatar) {
    VueCookies.set("avatar", avatar, "0");
    state.avatar = avatar;
  },
  setRouter(state, router) {
    state.router = router;
  },
};
const actions = {
  setAccessToken({ commit }, accessToken) {
    commit("setAccessToken", accessToken);
  },
  logout({ commit }) {
    commit("setAccessToken", "");
    VueCookies.remove("accessToken");
    localStorage.removeItem("menu-data");
    return true;
  },
};
export default { state, getters, mutations, actions };
