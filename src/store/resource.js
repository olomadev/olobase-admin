import * as methods from "../providers/data/actions"
let storeActions = {}
let {
  GET_LIST,
  GET_TREE,
  GET_NODES,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_ROW,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
  COPY,
  COPY_MANY,
  MOVE_NODE,
} = methods;

export default ({ provider, resource, i18n }) => {
  let { name, api, getName } = resource;

  Object.values(methods).forEach(
    (action) =>
      (storeActions[action] = async ({ state, commit, dispatch }, params) => {
        try {
          if (!provider) {
            throw new Error("No data provider defined");
          }

          if (!provider[action]) {
            throw new Error(`Data provider action '${action}' not implemented`);
          }

          /**
           * Only set global loading when read actions
           */
          if ([GET_LIST, GET_TREE, GET_NODES, GET_ONE].includes(action)) {
            commit("api/setLoading", true, {
              root: true,
            });
          }

          let response = await provider[action](api || name, {
            locale: state.locale,
            ...params,
          });

          if (action == DELETE) { // remove current item if delete
            state.item = null;
          }
          
          commit("api/setLoading", false, {
            root: true,
          })
          /**
           * Apply success message on writes operations
           */
          dispatch("showSuccess", { action, params });
          
          return Promise.resolve(response)

        } catch (e) {
          commit("api/setLoading", false, {
            root: true,
          })
          dispatch("showError", e.message);
          dispatch("auth/checkError", e, {
            root: true,
          });
          return Promise.reject(e);
        }
      })
  );

  return {
    namespaced: true,
    state: {
      sort: null,
      item: null,
      row: null,
      formItem: null,
      dialogItem: null
    },
    getters: {
      ["getItem"](state) {
        return state.item;
      },
      ["getFormItem"](state) {
        return state.formItem;
      },
      ["getRow"](state) {
        return state.row;
      },
      ["getSort"](state) {
        return state.sort;
      },
      ["getDialogItem"](state) {
        return state.dialogItem;
      }
    },
    mutations: {
      setSort(state, item) {
        state.sort = item
      },
      setItem(state, item) {
        state.item = item
      },
      setFormItem(state, item) {
        state.formItem = item
      },
      removeItem(state) {
        state.item = null
      },
      setRow(state, row) {
        state.row = row
      },
      removeRow(state) {
        state.row = null
      },
      setDialogItem(state, item) {
        state.dialogItem = item;
      },
      removeDialogItem(state) {
        state.dialogItem = null;
      }
    },
    actions: {
      ...storeActions,
      async refresh({ state, commit, dispatch }) {
        if (state.item) {
          /**
           * Refresh current resource and update item state
           */
          let { data } = await dispatch(GET_ONE, {
            id: state.item.id,
          });

          commit("setItem", data);
        }
      },
      showSuccess({ commit }, { action, params }) {
        let messages = {
          [CREATE]: () =>
            i18n.global.t("va.messages.created", {
              resource: getName(1),
            }),
          [UPDATE]: () =>
            i18n.global.t("va.messages.updated", {
              resource: getName(1),
              id: params.id,
            }),
          [UPDATE_ROW]: () =>
            i18n.global.t("va.messages.updated", {
              resource: getName(1),
              id: params.id,
            }),
          [UPDATE_MANY]: () =>
            i18n.global.t("va.messages.updated_many", {
              resource: getName(params.ids.length).toLowerCase(),
              count: params.ids.length,
            }),
          [DELETE]: () =>
            i18n.global.t("va.messages.deleted", {
              resource: getName(1),
              id: params.id,
            }),
          [DELETE_MANY]: () =>
            i18n.global.t("va.messages.deleted_many", {
              resource: getName(params.ids.length).toLowerCase(),
              count: params.ids.length,
            }),
          [COPY]: () =>
            i18n.global.t("va.messages.copied", {
              resource: getName(1),
              id: params.id,
            }),
          [COPY_MANY]: () =>
            i18n.global.t("va.messages.copied_many", {
              resource: getName(params.ids.length).toLowerCase(),
              count: params.ids.length,
            }),
          [MOVE_NODE]: () =>
            i18n.global.t("va.messages.moved", {
              resource: getName(1),
              id: params.id,
            }),
        };

        if (messages[action]) {
          commit(
            "messages/show",
            { color: "success", message: messages[action]() },
            {
              root: true,
            }
          );
        }
      },
      showError({ commit }, message) {
        commit(
          "messages/show",
          { color: "error", message },
          {
            root: true,
          }
        );
      },
    },
  };
};
