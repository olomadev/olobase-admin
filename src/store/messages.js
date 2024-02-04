
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
    },
  },
  getters: {
    ['getSnackbar'](state) {
      return state.snackbar
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
      if (!type) return;
      switch (type) {
        case "error":
          state.snackbar = {
            color: "error",
            icon: "mdi-close-circle",
            mode: "multi-line",
            position: "top",
            timeout: 7500,
            title: "va.messages.error",
            text: message,
            visible: true
          };
          break;
        case "info":
          state.snackbar = {
            color: "blue",
            icon: "mdi-information",
            mode: "multi-line",
            position: "top",
            timeout: 7500,
            title: "va.messages.info",
            text: message,
            visible: true
          };
          break;
        case "success":
          state.snackbar = {
            color: "success",
            icon: "mdi-checkbox-marked-circle",
            mode: "multi-line",
            position: "top",
            timeout: 7500,
            title: "va.messages.success",
            text: message,
            visible: true
          };
          break;
        case "warning":
          state.snackbar = {
            color: "warning",
            icon: "mdi-alert-circle",
            mode: "multi-line",
            position: "top",
            timeout: 7500,
            title: "va.messages.warning",
            text: message,
            visible: true
          };
          break;
      }
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
