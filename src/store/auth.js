
import cookies from "olobase-admin/src/utils/cookies";
/**
 * Get cookie constants object
 */
const cookieKey = JSON.parse(import.meta.env.VITE_COOKIE);
import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_ID,
  GET_FULLNAME,
  GET_EMAIL,
  GET_AVATAR,
  GET_PERMISSIONS,
} from "../providers/auth/actions";

export default (provider, router) => {
  return {
    namespaced: true,
    state: { user: null },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
    },
    getters: {
      [GET_ID](state) {
        if (state.user && provider[GET_ID]) {
          return provider[GET_ID](state.user);
        }
      },
      [GET_FULLNAME](state) {
        if (state.user && provider[GET_FULLNAME]) {
          return provider[GET_FULLNAME](state.user);
        }
      },
      [GET_EMAIL](state) {
        if (state.user && provider[GET_EMAIL]) {
          return provider[GET_EMAIL](state.user);
        }
      },
      [GET_AVATAR](state) {
        if (state.user && provider[GET_AVATAR]) {
          return provider[GET_AVATAR](state.user);
        }
      },
      [GET_PERMISSIONS](state) {
        if (state.user && provider[GET_PERMISSIONS]) {
          return provider[GET_PERMISSIONS](state.user) || [];
        }
        return [];
      },
    },
    actions: {
      /**
       * Server login with given credentials
       * checkAuth action will set fresh user infos on store automatically
       */
      // eslint-disable-next-line no-empty-pattern
      [LOGIN]: async ({}, credentials) => {
        await provider[LOGIN](credentials);
        router.push({ name: "dashboard" });
      },
      /**
       * Explicit logout action, remove user from storage
       */
      [LOGOUT]: async () => {
        await provider[LOGOUT]();
        router.push({ name: "login" });
      },
      /**
       * Check valid auth on target route server by retrieving user infos
       * Set fresh user infos on store
       * Called after each URL navigation
       */
      [CHECK_AUTH]: async ({ commit }) => {
        if (! cookies.get(cookieKey.token)) {
          commit("setUser", null);
          return false
        }
        try {
          let response = await provider[CHECK_AUTH]();
          if (response) {
            commit("setUser", response.data);
          }
          return response.data;
        } catch (e) {
          commit("setUser", null);
        }
      },
      /**
       * Check API error status
       * Called after each API error (4xx, 5xx)
       * Do automatic logout if reject promise returned
       */
      [CHECK_ERROR]: async ({ dispatch }, error) => {
        try {
          await provider[CHECK_ERROR](error);
        } catch (e) {
          dispatch("logout");
        }
      },
    },
  };
};
