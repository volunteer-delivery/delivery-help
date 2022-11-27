<template>
    <div><Nuxt/></div>
</template>

<script>
import { mdiCar, mdiCheck, mdiClose, mdiPlay } from '@mdi/js';

let subscriptions = [];

export default {
    name: 'default',

    icons: {
        mdiClose
    },

    navItems: [
        {
            id: 'pending',
            title: 'Нові',
            icon: mdiCar,
            url: '/'
        },
        {
            id: 'active',
            title: 'Активні',
            icon: mdiPlay,
            url: '/active'
        },
        {
            id: 'done',
            title: 'Завершені',
            icon: mdiCheck,
            url: '/done'
        }
    ],

    computed: {
        isBottomNavigation() {
            return this.$device.isMobileOrTablet;
        },

        navigationExtra() {
            return this.$store.state['navigation-store'].extra;
        },

        navigationExtraModel: {
            get() {
                return this.isNavigationExtraOpened;
            },
            set(toOpened) {
                toOpened ? this.openNavigationExtra() : this.closeNavigationExtra();
            }
        },

        isNavigationExtraOpened() {
            return this.$store.state['navigation-store'].extraOpened;
        },

        drivesCounter() {
            return this.$store.getters['drives-store/counter'];
        }
    },

    methods: {
        openNavigationExtra() {
            this.$store.commit('navigation-store/openExtra');
        },

        closeNavigationExtra() {
            this.$store.commit('navigation-store/closeExtra');
        }
    },

    async middleware({ store, $apiCable }) {
        subscriptions.forEach(unsubscribe => unsubscribe());

        await Promise.all([
            store.dispatch('drives-store/load'),
            store.dispatch('auth-store/loadCurrentUser')
        ]);
        const { currentUser } = store.state['auth-store'];

        subscriptions = [
            $apiCable.bindVuexAction('rides/new', 'drives-store/add'),
            $apiCable.bindVuexAction('rides/update', 'drives-store/update'),
            $apiCable.bindVuexAction(`users/${currentUser.id}/rides/update`, 'drives-store/update')
        ];
    }
};
</script>

<style>
.v-list-item--active .v-icon,
.v-btn--active .v-icon {
    color: #3F51B5 !important;
}

.v-bottom-navigation .v-btn {
    min-width: 80px !important;
    height: 100% !important;
    background-color: #fff !important;
}

.v-bottom-navigation .v-btn.v-btn--active {
    color: #3F51B5 !important;
    background-color: #f5f5f5 !important;
}

.layout__main {
    padding-top: 16px !important;
    padding-bottom: 96px !important;
}

.layout__close-navigation-extra {
    position: absolute;
    top: 16px;
    right: 16px;
}

.v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
}

.drawer__navigation-extra {
    margin-top: auto;
}

.v-bottom-navigation .v-btn::before {
    display: none;
}

.v-list-item:not(.v-list-item--active) .v-badge__badge,
.v-bottom-navigation .v-btn:not(.v-btn--active) .v-badge__badge {
    background-color: #6f6f6f !important;
    border-color: #6f6f6f !important;
}

.toasted {
    font-family: "Roboto", sans-serif;
}
</style>
