<template>
    <AppButton
        class="inline-flex py-2 px-2.5 text-md"
        look="link"
        :to="backUrl"
        v-if="backUrl"
    >
        <Icon class="self-center" size="16">
            <ArrowBackIosRound />
        </Icon>
        <span class="ml-2 leading-none">Назад</span>
    </AppButton>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils';
import ArrowBackIosRound from '@vicons/material/ArrowBackIosRound';

const navigationStore = useNavigationStore();
const backUrl = computed(() => navigationStore.previousRoute?.fullPath);
</script>
