export const actions = {
  async signIn(context, credentials) {
    await this.$axios.post('auth/sign-in', {
      username: credentials.username,
      password: credentials.password
    });
  }
};
