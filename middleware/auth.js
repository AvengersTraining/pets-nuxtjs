export default function(context) {
  // Check login
  if (!context.store.getters.isAuthenticated) {
    return context.redirect('/login');
  }

  if (context.store.getters.profile) {
    return;
  }

  context.$axios.setToken(context.store.getters.isAuthenticated, 'Bearer');

  context.$axios.$get('/profile')
      .then(response => {
          context.store.dispatch('setProfile', response);
      })
      .catch(error => {
          return context.redirect('/login');
      });
}
