import {
  CHECK_AUTH,
  CHECK_ERROR,
  GET_ID,
  GET_FULLNAME,
  GET_EMAIL,
  GET_AVATAR,
  GET_PERMISSIONS,
} from "../providers/auth/actions";

export default {
  namespaced: true,
  getters: {
    [GET_ID]() {
      return null;
    },
    [GET_FULLNAME]() {
      return null;
    },
    [GET_EMAIL]() {
      return null;
    },
    [GET_AVATAR]() {
      return null;
    },
    [GET_PERMISSIONS]() {
      return [];
    },
  },
  actions: {
    [CHECK_AUTH]: () => Promise.resolve(true),
    [CHECK_ERROR]: () => {},
  },
};
