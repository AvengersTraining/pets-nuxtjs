export default function(context) {
  // Check login
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/login');
  }
}
