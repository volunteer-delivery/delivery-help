export const state = () => ({
    currentUser: null
})

export const actions = {
    async signIn(context, credentials) {
        await this.$axios.post('auth/sign-in', {
            username: credentials.username,
            password: credentials.password
        });
    },

    async loadCurrentUser(context) {
        if (context.state.currentUser) return;

        const response = await this.$axios.get('user/current');
        context.commit('setUser', response.data.user)
    }
};

export const mutations = {
    setUser(state, user) {
        state.currentUser = user;
    }
};
