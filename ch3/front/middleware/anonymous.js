export default function ({ store, redirect }) {
  if (store.state.users.me) {
    redirect('/');
  }
}
