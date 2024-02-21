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
} from "./actions";

export default (axios, params = {}) => {
  params = {
    routes: {
      user: null,
    },
    getId: (r) => r.user.id,
    getFullname: (r) => r.user.fullname,
    getEmail: (r) => r.user.email,
    getAvatar: () => localStorage.getItem("avatar"),
    getPermissions: (r) => r.user.permissions,
    ...params,
  };

  let {
    routes,
    getCredentials,
    getId,
    getFullname,
    getEmail,
    getAvatar,
    getPermissions
  } = params;

  return {
    [LOGIN]: async ({ username, password }) => {
      axios.defaults.auth = {
        username,
        password,
      };
      return Promise.resolve();
    },
    [LOGOUT]: () => {
      delete axios.defaults.auth;
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      if (!axios.defaults.auth) {
        throw new Error("Unauthenticated");
      }

      if (!routes.user) {
        return Promise.resolve({
          data: {
            name: axios.defaults.auth.username,
          },
        });
      }

      let response = await axios.get(routes.user);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      return response.data;
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        delete axios.defaults.auth;
        return Promise.reject();
      }
      return Promise.resolve();
    },
    [GET_ID]: (r) => getId(r),
    [GET_FULLNAME]: (r) => getFullname(r),
    [GET_EMAIL]: (r) => getEmail(r),
    [GET_AVATAR]: () => getAvatar(),
    [GET_PERMISSIONS]: (r) => getPermissions(r),
  };
};
