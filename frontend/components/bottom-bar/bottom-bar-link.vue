<template>
    <AppButton
        class="bottom-bar-link text-gray-600 min-w-[80px] transition-colors"
        :to="to"
        :ripple="RippleColor.BLUE_800"
    >
        <span class="h-14 px-4 text-xs h-full flex flex-col items-center justify-center font-medium tracking-wider">
            <Icon size="24px">
                <component :is="icon" />
            </Icon>

            {{ title }}
        </span>
    </AppButton>
</template>

<script setup lang="ts">
import { Icon } from '@vicons/utils';

defineProps({
    to: {
        type: [String, Object],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.bottom-bar-link.router-link-exact-active {
    @apply text-blue-800 bg-slate-100;
}
</style>
