export const ApiCableMixin = {
    created() {
        this.$apiCableSubscriptions = [];
    },

    destroyed() {
        for (const offSubscription of this.$apiCableSubscriptions) {
            offSubscription();
        }
    },

    methods: {
        listApiEvent(name, callback) {
            const offEvent = this.$apiCable.on(name, callback);
            this.$apiCableSubscriptions.push(offEvent);
        }
    }
};
