
import config from "@/_config";

export default {
  namespaced: true,
  state: {
    hideApiErrors: false,
    confirm: null,
    resolve: null,
    reject: null,
    snackbar: {
      class: null,
      color: null,
      icon: null,
      location: "top",
      variant: null,
      rounded: 0,
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
    ['getHideApiErrors'](state) {
      return state.hideApiErrors;
    },
  },
  mutations: {
    hideApiErrors(state, status) {
      state.hideApiErrors = status;
    },
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
        class: null,
        color: null,
        icon: null,
        location: "top",
        variant: null,
        rounded: 0,
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
        class: config.snackbar[type].class,
        color: config.snackbar[type].color,
        icon: config.snackbar[type].icon,
        location: config.snackbar[type].location,
        variant: config.snackbar[type].variant,
        rounded: config.snackbar[type].rounded,
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
