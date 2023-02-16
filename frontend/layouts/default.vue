<template>
    <BottomBar v-if="device.isMobileOrTablet">
        <LayoutMain>
            <slot />
        </LayoutMain>

        <template #bar>
            <AppBadge
                class="bottom-bar-badge"
                v-for="nav of navItems"
                :key="nav.id"
                :content="nav.count"
                :show="nav.hasCount"
                :color="nav.badgeColor"
            >
                <BottomBarLink
                    :to="nav.url"
                    :title="nav.title"
                    :icon="nav.icon"
                />
            </AppBadge>

            <NavigationExtra />
        </template>
    </BottomBar>

    <SideBar v-else>
        <template #bar>
            <AppBadge
                class="mb-1 side-bar-badge"
                v-for="nav of navItems"
                :key="nav.id"
                :content="nav.count"
                :show="nav.hasCount"
                :color="nav.badgeColor"
            >
                <SideBarLink
                    :to="nav.url"
                    :title="nav.title"
                    :icon="nav.icon"
                />
            </AppBadge>

            <NavigationExtra />
        </template>

        <LayoutMain class="px-6">
            <slot />
        </LayoutMain>
    </SideBar>
</template>

<script lang="ts" setup>
import { Transition } from 'vue';
import type { Component, FunctionalComponent } from 'vue';
import { CheckRound, DirectionsCarFilledRound, PlayArrowRound } from '@vicons/material';
import { BadgeColor } from '~/enums';

interface INavItem {
    id: 'active' | 'pending' | 'done';
    title: string;
    icon: Component;
    url: string;
    count: string;
    hasCount: boolean;
    badgeColor: BadgeColor;
    active: boolean;
}

type INavOptions = Pick<INavItem, 'id' | 'title' | 'url' | 'icon'>;

const device = useDevice();
const route = useRoute();
const apiCable = useApiCable();
const ridesStore = useRidesStore();
const authStore = useAuthStore();
const navigationStore = useNavigationStore();

function useNavItem(item: INavOptions): INavItem {
    const count = ridesStore.counter[item.id];
    const active = item.url === route.path;
    return ({
        ...item,
        active,
        count,
        hasCount: !!parseInt(count),
        badgeColor: active ? BadgeColor.BLUE_800 : BadgeColor.SLATE_600,
    });
}

const navItems = computed((): INavItem[] => [
    useNavItem({
        id: 'pending',
        url: '/',
        title: 'Нові',
        icon: DirectionsCarFilledRound,
    }),
    useNavItem({
        id: 'active',
        url: '/active',
        title: 'Активні',
        icon: PlayArrowRound,
    }),
    useNavItem({
        id: 'done',
        url: '/done',
        title: 'Завершені',
        icon: CheckRound,
    }),
]);

await useAsyncData(() => Promise.all([
    ridesStore.load(),
    authStore.loadCurrentUser(),
]));

apiCable.on('rides/new', ridesStore.add);
apiCable.on('rides/update', ridesStore.update);
apiCable.on(`users/${authStore.currentUser!.id}/rides/update`, ridesStore.update);

const LayoutMain: FunctionalComponent = (_, { attrs, slots }) => {
    const renderAttrs = {
        ...attrs,
        class: ['pt-4 pb-24 h-full', attrs.class],
    };
    return h('main', renderAttrs, slots.default!());
};

const NavigationExtra: FunctionalComponent = () => {
    const transitionProps = {
        name: 'navigation-extra',
        duration: { enter: 200, leave: 150 },
    };
    return h(Transition, transitionProps, () => {
        return navigationStore.extra ? h(navigationStore.extra) : null;
    });
};
</script>

<style scoped>
.bottom-bar-badge:deep(.badge) {
    @apply -top-2 right-0;
}

.side-bar-badge:deep(.badge) {
    @apply -top-1.5 left-8;
}

.navigation-extra-enter-active {
    @apply transition-fade duration-200;
}

.navigation-extra-leave-active {
    @apply transition-fade duration-150;
}

.navigation-extra-enter-from {
    @apply opacity-0 scale-75 md:scale-95;
}

.navigation-extra-leave-to {
    @apply opacity-0;
}
</style>
