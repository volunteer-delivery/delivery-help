<template>
    <AppButton
        class="side-bar-link text-gray-600 transition-colors overflow-clip rounded"
        :to="to"
        v-ripple.blue-800
    >
        <div class="flex h-full flex items-center h-10 px-2">
            <Icon size="24">
                <component :is="icon" />
            </Icon>

            <span class="block ml-8 font-medium text-sm">
                {{ title }}
            </span>
        </div>
    </AppButton>
</template>

<script setup lang="ts">
import {Icon} from "@vicons/utils";
import {vRipple} from "#imports";

defineProps({
    to: {
        type: [String, Object],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    icon: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.side-bar-link:hover,
.side-bar-link:focus {
    @apply bg-slate-50;
}

.side-bar-link.router-link-exact-active {
    @apply text-blue-800 bg-slate-100;
}
</style>
