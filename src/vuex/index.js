import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    login(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
    initializeStore(state) {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
      }
    },
  },
  actions: {},
  modules: {},
});
