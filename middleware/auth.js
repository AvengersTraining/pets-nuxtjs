export default function(context) {
  // Check login
  if (!context.store.getters.isAuthenticated) {
    return context.redirect('/login');
  }

  context.$axios.setToken(context.store.getters.isAuthenticated, 'Bearer');

  if (context.store.getters.profile) {
    return;
  }

  context.$axios.$get('/profile')
      .then(response => {
          context.store.dispatch('setProfile', response);
      })
      .catch(error => {
          return context.redirect('/login');
      });
}
