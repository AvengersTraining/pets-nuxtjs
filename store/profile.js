const moduleProfile = {
  state: () => ({
    profile: null
  }),
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    }
  },
  actions: {
    setProfile(vuexContext, profile) {
      vuexContext.commit('setProfile', profile);
    }
  },
  getters: {
    profile(state) {
      return state.profile;
    }
  },
}

export default moduleProfile;
