import Vuex from 'vuex';
import moduleAuth from './login';


const createCommonStore = () => {
  return new Vuex.Store({
    modules: {
      moduleAuth: moduleAuth,
    }
  });
}

export default createCommonStore;
