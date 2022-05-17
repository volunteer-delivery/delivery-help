<template>
    <v-app>
        <v-navigation-drawer v-if="!isBottomNavigation" fixed permanent>
            <v-list class="pt-5" nav dense>
                <v-list-item
                    v-for="item of $options.navItems"
                    :key="item.url"
                    :to="item.url"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>

            <component
                v-if="navigationExtra"
                class="pt-10"
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
                    v-for="(item, index) of $options.navItems"
                    :key="item.url"
                    :to="item.url"
                    :class="{ 'ml-2': index > 0 }"
                >
                    <span>{{ item.title }}</span>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
            </v-bottom-navigation>

            <template v-if="navigationExtra">
                <v-fade-transition>
                    <component :is="navigationExtra.mobileTrigger" @open="openNavigationExtra"/>
                </v-fade-transition>

                <v-bottom-sheet :value="isNavigationExtraOpened" persistent>
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
import { mdiCar, mdiClose, mdiPlay } from '@mdi/js';

export default {
    icons: {
        mdiClose
    },

    navItems: [
        {
            title: 'Нові',
            icon: mdiCar,
            url: '/'
        },
        {
            title: 'Активні',
            icon: mdiPlay,
            url: '/active'
        }
    ],

    computed: {
        isBottomNavigation() {
            return this.$device.isMobileOrTablet;
        },

        navigationExtra() {
            return this.$store.state['navigation-store'].extra;
        },

        isNavigationExtraOpened() {
            return this.$store.state['navigation-store'].extraOpened;
        }
    },

    methods: {
        openNavigationExtra() {
            this.$store.commit('navigation-store/openExtra');
        },

        closeNavigationExtra() {
            this.$store.commit('navigation-store/closeExtra');
        }
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

.toasted {
    font-family: "Roboto", sans-serif;
}
</style>
