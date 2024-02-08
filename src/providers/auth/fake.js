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

/**
 * Fake login for testing purpose without need of real auth server
 */
export default () => {
  return {
    [LOGIN]: ({ username }) => {
      localStorage.setItem("username", username);
    },
    [LOGOUT]: () => {
      localStorage.removeItem("username");
      return Promise.resolve();
    },
    [CHECK_AUTH]: () => {
      let name = localStorage.getItem("username");
      return name
        ? Promise.resolve({
            data: {
              name,
            },
          })
        : Promise.reject();
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        localStorage.removeItem("username");
        return Promise.reject();
      }
      return Promise.resolve();
    },
    [GET_ID]: (u) => u.id,
    [GET_FULLNAME]: (u) => u.fullname,
    [GET_EMAIL]: (u) => u.email,
    [GET_AVATAR]: (user) => getAvatar(user),
    [GET_PERMISSIONS]: (user) => getPermissions(user),
  };
};
