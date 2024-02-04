import * as methods from "../providers/data/actions";

let storeActions = {};

Object.values(methods).forEach((action) => {
  storeActions[action] = ({ dispatch }, { resource, params }) => {
    return dispatch(`${resource}/${action}`, params, {
      root: true,
    })
  }
});
/**
 * Be careful when adding methods here. 
 * If you change some method names of variables accidentally, 
 * the application may not work properly.
 */
export default {
  namespaced: true,
  state: {
    fields: null,
    headers: null,
    drawer: true,
    saved: false,
    status: false,
    toggle: false,
    loading: false,
    refresh: false,
    rowForm: null,
    filterValues: null,
  },
  mutations: {
    setHeaders(state, headers) {
      state.headers = headers;
    },
    setFields(state, fields) {
      state.fields = fields;
    },
    setFilterValues(state, values) {
      state.filterValues = values;
    },
    setToggleDrawer(state, toggle) {
      state.drawer = toggle;
    },
    setFormSaved(state, saved) {
      state.saved = saved;
    },
    setFormStatus(state, changed) {
      state.status = changed
    },
    setLoading(state, loading) {
      state.loading = loading;
      if (!loading) {
        state.refresh = false;
      }
    },
    setRefresh(state, refresh) {
      state.refresh = refresh;
    },
    setRowForm(state, item) {
      state.rowForm = item;
    },
  },
  getters: {
    ['getHeaders'](state) {
      return state.headers
    },
    ['getFields'](state) {
      return state.fields
    },
    ['getFilterValues'](state) {
      return state.filterValues
    },
    ['getLoading'](state) {
      return state.loading
    },
    ['getToggleDrawer'](state) {
      return state.drawer
    },
    ['getFormSaved'](state) {
      return state.saved
    },
    ['getFormStatus'](state) {
      return state.status
    },
    ["getRowForm"](state) {
      return state.rowForm;
    },
  },
  actions: {
    ...storeActions,
    refresh({ commit, dispatch }, resource) {
      if (!resource) {
        return;
      }
      commit("setRefresh", true);
      return dispatch(`${resource}/refresh`, {}, { root: true, })
    },
  },
};
