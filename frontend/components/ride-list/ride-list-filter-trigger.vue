<template>
    <AppButton
        look="icon-primary"
        class="absolute -top-16 right-4"
        size="lg"
        @click="openFilter"
        v-if="device.isMobileOrTablet"
    >
        <Icon size="24">
            <FilterAltFilled />
        </Icon>
    </AppButton>

    <AppButton
        class="text-center w-full mt-auto"
        look="primary"
        size="md"
        @click="openFilter"
        v-else
    >
        ФІЛЬТРУВАТИ
    </AppButton>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils';
import { FilterAltFilled } from '@vicons/material';
import { RideListFilter } from '#components'

const device = useDevice();
const modalStore = useModalStore();
const openFilter = () => modalStore.open(RideListFilter);
</script>
