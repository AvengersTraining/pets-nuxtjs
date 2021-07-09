export default function ({ $axios, store }) {
    $axios.setBaseURL('https://pet-rescue-api-haolt.herokuapp.com/api/v1')

    const token = store.state.moduleAuth.token
    if (!!token) {
        $axios.setToken(token, 'Bearer')

        $axios.onRequest(() => {
            store.dispatch('setLoading', true)
        })
    
        $axios.onResponse(() => {
            store.dispatch('setLoading', false)
        })
    }
}