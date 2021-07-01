const moduleAuth =  {
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

      if (request) {
        if (!request.headers.cookie) {
          return false;
        }

        // Get token cookie
        const tokenKey = request.headers.cookie.split(';').find(cookie => {
          return cookie.trim().startsWith('token=');
        });

        if (!tokenKey) {
          return false;
        }

        // Set token by cookie
        token = tokenKey.split('=')[1];
      } else {
        // Set token by local storage
        token = process.browser && localStorage.getItem('token');
      }

      if (!token) {
        return false;
      }

      vuexContext.commit('setToken', token);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token;
    }
  },
}

export default moduleAuth;
