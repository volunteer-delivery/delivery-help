<template>
    <div class="h-full pb-14" v-if="device.isMobileOrTablet">
        <slot />

        <BottomBar class="fixed bottom-0 left-0 w-full">
            <BottomBarLink
                v-for="nav of navItems"
                :key="nav.url"
                :title="nav.title"
                :icon="nav.icon"
                :to="nav.url"
            />
        </BottomBar>
    </div>

    <slot v-else />

<!--    <v-app>-->
<!--        <v-navigation-drawer v-if="!isBottomNavigation" fixed permanent app>-->
<!--            <v-list class="pt-5" nav dense>-->
<!--                <v-list-item-->
<!--                    v-for="item of navItems"-->
<!--                    :key="item.url"-->
<!--                    :to="item.url"-->
<!--                    :ripple="false"-->
<!--                    exact-->
<!--                >-->
<!--                    <v-list-item-icon>-->
<!--                        <v-badge :content="drivesStore.counter[item.id]" :value="drivesStore.counter[item.id]">-->
<!--                            <v-icon>{{ item.icon }}</v-icon>-->
<!--                        </v-badge>-->
<!--                    </v-list-item-icon>-->

<!--                    <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--                </v-list-item>-->
<!--            </v-list>-->

<!--            <component-->
<!--                v-if="navigationStore.extra"-->
<!--                class="pt-5 pb-5 drawer__navigation-extra"-->
<!--                :is="navigationStore.extra.view"-->
<!--            />-->
<!--        </v-navigation-drawer>-->

<!--        <v-main class="layout__main">-->
<!--            <v-container>-->
<!--                <slot/>-->
<!--            </v-container>-->
<!--        </v-main>-->

<!--        <template v-if="isBottomNavigation">-->
<!--            <v-bottom-navigation fixed>-->
<!--                <v-btn-->
<!--                    v-for="item of navItems"-->
<!--                    :key="item.url"-->
<!--                    :to="item.url"-->
<!--                    :ripple="false"-->
<!--                    exact-->
<!--                >-->
<!--                    <span>{{ item.title }}</span>-->

<!--                    <v-badge :content="drivesStore.counter[item.id]" :value="drivesStore.counter[item.id]">-->
<!--                        <v-icon>{{ item.icon }}</v-icon>-->
<!--                    </v-badge>-->
<!--                </v-btn>-->
<!--            </v-bottom-navigation>-->

<!--            <template v-if="navigationStore.extra">-->
<!--                <v-fade-transition>-->
<!--                    <component-->
<!--                        :is="navigationStore.extra.mobileTrigger"-->
<!--                        @open="navigationStore.openExtra"-->
<!--                    />-->
<!--                </v-fade-transition>-->

<!--                <v-bottom-sheet v-model="navigationExtraModel">-->
<!--                    <v-card tile>-->
<!--                        <component-->
<!--                            :is="navigationStore.extra.view"-->
<!--                            @close="navigationStore.closeExtra"-->
<!--                        />-->

<!--                        <v-btn class="layout__close-navigation-extra" icon @click="navigationStore.closeExtra">-->
<!--                            <v-icon>{{ mdiClose }}</v-icon>-->
<!--                        </v-btn>-->
<!--                    </v-card>-->
<!--                </v-bottom-sheet>-->
<!--            </template>-->
<!--        </template>-->
<!--    </v-app>-->
</template>

<script lang="ts" setup>
import { DirectionsCarFilledRound, PlayArrowRound, CheckRound } from '@vicons/material';

const device = useDevice();

const navItems = [
    {
        title: 'Нові',
        icon: DirectionsCarFilledRound,
        url: '/'
    },
    {
        title: 'Активні',
        icon: PlayArrowRound,
        url: '/active'
    },
    {
        title: 'Завершені',
        icon: CheckRound,
        url: '/done'
    }
];


// import { mdiCar, mdiCheck, mdiClose, mdiPlay } from '@mdi/js';
//
// const apiCable = useApiCable();
// const drivesStore = useDrivesStore();
// const authStore = useAuthStore();
// const navigationStore = useNavigationStore();
// const device = useDevice();
//
// let subscriptions = [];
//
// addRouteMiddleware('listen-global-events', async () => {
//     subscriptions.forEach(unsubscribe => unsubscribe());
//
//     await Promise.all([
//         drivesStore.load(),
//         authStore.loadCurrentUser(),
//     ]);
//
//     const userId = authStore.currentUser.id;
//
//     subscriptions = [
//         apiCable.on('rides/new', drivesStore.add),
//         apiCable.on('rides/update', drivesStore.update),
//         apiCable.on(`users/${userId.id}/rides/update`, drivesStore.update)
//     ];
// });
//
//
// const isBottomNavigation = computed(() => device.isMobileOrTablet);
//
// const navigationExtraModel = computed({
//     get: () => navigationStore.extraOpened,
//     set: (toOpened) => toOpened ? navigationStore.openExtra() : navigationStore.closeExtra()
// });
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
