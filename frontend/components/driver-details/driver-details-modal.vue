<template>
    <AppModal :title="driver.name">
        <a class="inline-flex items-center text-gray-600 mt-2 mb-10 hover:underline" :href="phoneLink">
            <Icon size="24">
                <LocalPhoneRound />
            </Icon>

            <span class="ml-2">
                {{ driver.phone }}
            </span>
        </a>

        <h2 class="mt-0 mb-3 text-lg text-gray-700 font-medium">
            Історія Поїздок
        </h2>

        <DriverDetailsHistory :driver="driver" />
    </AppModal>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Icon } from '@vicons/utils';
import LocalPhoneRound from '@vicons/material/LocalPhoneRound';
import type { Driver } from '~/stores/rides-store';

const props = defineProps({
    driver: {
        type: Object as PropType<Driver>,
        required: true,
    },
});

const modal = useActiveModal();

const phoneLink = computed(() => `tel:${props.driver.phone}`);
</script>
