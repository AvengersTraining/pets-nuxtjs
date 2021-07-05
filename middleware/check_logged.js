export default function(context) {
  // Check logged
  if (context.store.getters.isAuthenticated) {
    context.redirect('/');
  }
}
