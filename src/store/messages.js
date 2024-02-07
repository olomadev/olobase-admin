
import config from "@/_config";

export default {
  namespaced: true,
  state: {
    confirm: null,
    resolve: null,
    reject: null,
    snackbar: {
      color: null,
      icon: null,
      mode: null,
      position: "top",
      text: null,
      timeout: 7500,
      title: null,
      visible: false
    }
  },
  getters: {
    ['getSnackbar'](state) {
      return state.snackbar;
    },
  },
  mutations: {
    showConfirm(state, { title, message }) {
      state.confirm = { title, message };
    },
    hideConfirm(state) {
      state.confirm = null;
    },
    setResolve(state, resolve) {
      state.resolve = resolve;
    },
    setReject(state, reject) {
      state.reject = reject;
    },
    cleanError(state) {
      state.error = null;
    },
    cleanSnackbar(state) {
      state.snackbar = {
        color: null,
        icon: null,
        mode: null,
        position: "top",
        text: null,
        timeout: 7500,
        title: null,
        visible: false
      }
    },
    show(state, { type, message }) {
      if (!type || !config.snackbar[type]) {
        return;
      }
      state.snackbar = {
        color: config.snackbar[type].color,
        icon: config.snackbar[type].icon,
        mode: config.snackbar[type].mode,
        position: config.snackbar[type].position,
        timeout: config.snackbar[type].timeout,
        title: config.snackbar[type].title,
        text: message,
        visible: config.snackbar[type].visible 
      };
    },
  },
  actions: {
    confirm({ commit }, { title, message }) {
      commit("showConfirm", { title, message });

      return new Promise((resolve, reject) => {
        commit("setResolve", resolve)
        commit("setReject", reject)
      })
    },
    agree({ state, commit }) {
      state.resolve(true);
      commit("hideConfirm");
    },
    cancel({ state, commit }) {
      state.resolve(false);
      commit("hideConfirm");
    },
  },
};
