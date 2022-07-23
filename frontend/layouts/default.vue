<template>
    <v-app>
        <v-navigation-drawer v-if="!isBottomNavigation" fixed permanent>
            <v-list class="pt-5" nav dense>
                <v-list-item
                    v-for="item of $options.navItems"
                    :key="item.url"
                    :to="item.url"
                    :ripple="false"
                >
                    <v-list-item-icon>
                        <v-badge :content="drivesCounter[item.id]" :value="drivesCounter[item.id]">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-badge>
                    </v-list-item-icon>

                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>

            <component
                v-if="navigationExtra"
                class="pt-5 pb-5 drawer__navigation-extra"
                :is="navigationExtra.view"
            />
        </v-navigation-drawer>

        <v-main class="layout__main">
            <v-container>
                <Nuxt/>
            </v-container>
        </v-main>

        <template v-if="isBottomNavigation">
            <v-bottom-navigation fixed>
                <v-btn
                    v-for="item of $options.navItems"
                    :key="item.url"
                    :to="item.url"
                    :ripple="false"
                >
                    <span>{{ item.title }}</span>

                    <v-badge :content="drivesCounter[item.id]" :value="drivesCounter[item.id]">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-badge>
                </v-btn>
            </v-bottom-navigation>

            <template v-if="navigationExtra">
                <v-fade-transition>
                    <component :is="navigationExtra.mobileTrigger" @open="openNavigationExtra"/>
                </v-fade-transition>

                <v-bottom-sheet v-model="navigationExtraModel">
                    <v-card tile>
                        <component
                            :is="navigationExtra.view"
                            @close="closeNavigationExtra"
                        />

                        <v-btn class="layout__close-navigation-extra" icon @click="closeNavigationExtra">
                            <v-icon>{{ $options.icons.mdiClose }}</v-icon>
                        </v-btn>
                    </v-card>
                </v-bottom-sheet>
            </template>
        </template>
    </v-app>
</template>

<script>
import { mdiCar, mdiCheck, mdiClose, mdiPlay } from '@mdi/js';

export default {
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

    async middleware({ store }) {
        await store.dispatch('drives-store/load');
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
