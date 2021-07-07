const modulePost = {
    state: () => ({
        listPost: [],
        listPet: [],
        loading: false,
    }),
    mutations: {
        setListPost(state, listPost) {
            state.listPost = listPost.posts;
        },
        setListPet(state, listPet) {
            state.listPet = listPet.pets;
        },
        setLoading(state, status) {
            state.loading = status;
        }
    },
    actions: {
        getListPost() {
            this.$axios.$get('/posts')
                .then(response => {
                    this.commit('setListPost', response);
                })
                .catch(error => {
                    return redirect('/login');
                });
        },
        getListPet() {
            this.$axios.$get('/pets')
                .then(response => {
                    this.commit('setListPet', response);
                })
                .catch(error => {
                    return redirect('/login');
                });
        },
        setLoading(vueContext, status) {
            this.commit('setLoading', status);
        }
    },
}
  
export default modulePost;