import Vuex from 'vuex';
import moduleAuth from './auth';
import moduleProfile from './profile';
import modulePost from './post';

const createCommonStore = () => {
  return new Vuex.Store({
    modules: {
      moduleAuth: moduleAuth,
      moduleProfile: moduleProfile,
      modulePost: modulePost,
    }
  });
}

export default createCommonStore;
