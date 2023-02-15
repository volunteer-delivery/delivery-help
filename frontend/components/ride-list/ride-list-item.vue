<template>
    <section class="p-4 border-b border-b-slate-300">
        <RidePath class="mb-3" :path="ride.path" />

        <AppButton
            class="p-1 -ml-1 flex font-medium text-gray-500"
            :ripple="RippleColor.BLUE_800"
        >
            <Icon size="24">
                <AccountBoxRound />
            </Icon>

            <span class="ml-1">
                {{ ride.driver.name }}
            </span>
        </AppButton>
    </section>
</template>

<script lang="ts" setup>
import type {PropType} from "vue";
import {Icon} from "@vicons/utils";
import {AccountBoxRound} from '@vicons/material';
import {Ride} from "~/stores/rides-store";

defineProps({
    ride: {
        type: Object as PropType<Ride>,
        required: true
    }
});
</script>
