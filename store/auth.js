import Cookies from "js-cookie";

const moduleAuth = {
  state: () => ({
    token: null,
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    initAuth(vuexContext, request) {
      let token;
      if (request && request.headers.cookie) {
        // Get token cookie
        const tokenKey = request.headers.cookie.split(';').find(cookie => {
          return cookie.trim().startsWith('token=');
        });

        if (!tokenKey) {
          return false;
        }
        token = tokenKey.split('=')[1];
      } else {
        token = Cookies.get('token');
      }

      vuexContext.commit('setToken', token);
    },
    logout(vuexContext) {
      vuexContext.commit('setToken', null);
      Cookies.remove('token');
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token;
    }
  },
}

export default moduleAuth;
