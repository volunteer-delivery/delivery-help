<template>
    <AppModal :title="driver.name">
        <a class="inline-flex items-center text-gray-600 mt-2 hover:underline" :href="phoneLink">
            <Icon size="24">
                <LocalPhoneRound />
            </Icon>

            <span class="ml-2">
                {{ driver.phone }}
            </span>
        </a>
    </AppModal>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import {Icon} from "@vicons/utils";
import {LocalPhoneRound} from '@vicons/material';
import type {Driver} from "~/stores/rides-store";

const props = defineProps({
    driver: {
        type: Object as PropType<Driver>,
        required: true
    }
});

const modal = useActiveModal();
const ridesStore = useRidesStore();

const rides = ridesStore.loadRidesByDriver(props.driver);

const phoneLink = computed(() => `tel:${props.driver.phone}`);
</script>
