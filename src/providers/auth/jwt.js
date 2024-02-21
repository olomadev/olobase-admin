
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
} from "./actions";

import FetchHydra from "../utils/fetchHydra";
// import {isAuthenticated} from "../utils/auth";

export default (httpClient, params = {}) => {
  if (typeof httpClient === "string") {
    httpClient = new FetchHydra(httpClient);
  }
  params = {
    routes: {
      login: "auth/token",
      logout: "auth/logout",
      refresh: "auth/refresh",
      user: "auth/me",
    },
    getToken: (r) => r.token,
    getCredentials: ({ username, password }) => {
      return {
        username,
        password,
      };
    },
    getId: (u) => u.id,
    getFullname: (u) => u.fullname,
    getEmail: (u) => u.email,
    getAvatar: () => localStorage.getItem("avatar"),
    getPermissions: (u) => u.permissions,
    ...params,
  };

  let {
    routes,
    getCredentials,
    getId,
    getFullname,
    getEmail,
    getAvatar,
    getPermissions,
    getToken,
  } = params;

  return {
    [LOGIN]: async ({ username, password }) => {
      let response = await httpClient.post(
        routes.login,
        getCredentials({ username, password })
      );
      cookies.remove(cookieKey.token);
      cookies.remove(cookieKey.user);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      cookies.set(cookieKey.user, JSON.stringify(response.data.data.user));
      cookies.set(cookieKey.token, getToken(response.data.data));
      localStorage.setItem("avatar", response.data.data.avatar);
      return Promise.resolve();
    },
    [LOGOUT]: async () => {
      if (routes.logout) {
        try {
          await httpClient.get(routes.logout)
        }
        catch(err) {
          console.error(err)
        }
      }
      cookies.remove(cookieKey.user)
      cookies.remove(cookieKey.token)
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
        const token = cookies.get(cookieKey.token)
        if (typeof token == "undefined" || token == "undefined" || token == "") {
            return Promise.reject()
        }
        let user = JSON.parse(cookies.get(cookieKey.user))
        if (user) {
          return Promise.resolve({
            data: {
                avatar: localStorage.getItem("avatar"),
                token: token,
                user: user,
                cookieKey: {
                  user:  cookieKey.user,
                  token: cookieKey.token,
                }
            },
          })
        } else {
            return Promise.reject()
        }
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        cookies.remove(cookieKey.user)
        cookies.remove(cookieKey.token);
        return Promise.reject();
      }
      return Promise.resolve();
    },
    [GET_ID]: (user) => getId(user),
    [GET_FULLNAME]: (user) => getFullname(user),
    [GET_EMAIL]: (user) => getEmail(user),
    [GET_AVATAR]: (user) => getAvatar(),
    [GET_PERMISSIONS]: (user) => getPermissions(user),

  };
};
