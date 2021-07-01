export default function(context) {
  // Init auth set token in local storage and cookie
  context.store.dispatch('initAuth', context.req);
}
