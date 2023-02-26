<template>
    <header class="border-b border-b-gray-200 pr-1 flex items-center justify-between">
        <div class="p-2 md:p-3 flex items-center">
            <img class="h-8 w-8" src="/logo.svg" alt="logo">

            <h1 class="hidden md:block ml-4 font-medium text-2xl">
                ВолонтерВантаж
            </h1>
        </div>

        <AppButton look="icon" size="md" @click="authStore.signOut">
            <Icon :size="iconSize">
                <LogOutRound />
            </Icon>
        </AppButton>
    </header>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils';
import LogOutRound from '@vicons/material/LogOutRound';

const device = useDevice();
const iconSize = computed(() => device.isMobileOrTablet ? 24 : 28);

const authStore = useAuthStore();
</script>
