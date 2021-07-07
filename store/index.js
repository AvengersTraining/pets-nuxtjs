import Vuex from 'vuex';
import moduleAuth from './auth';
import moduleProfile from './profile';


const createCommonStore = () => {
  return new Vuex.Store({
    modules: {
      moduleAuth: moduleAuth,
      moduleProfile: moduleProfile,
    }
  });
}

export default createCommonStore;
