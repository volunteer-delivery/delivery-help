<template>
    <div class="relative">
        <slot />

        <Transition name="badge" :duration="{ enter: 200, leave: 150 }">
            <p
                class="badge absolute rounded-full m-0 text-white h-5 min-w-[20px] flex items-center justify-center leading-none text-xs transition-colors z-50"
                :class="badgeClasses"
                v-if="show"
            >
                <span>{{ content }}</span>
            </p>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { BadgeColor } from '~/enums/badge';

// Dynamic Classes
// bg-slate-600
// bg-blue-800

const props = defineProps({
    content: {
        type: [Number, String],
        required: true,
    },

    show: {
        type: Boolean,
        required: false,
        default: true,
    },

    color: {
        type: String as PropType<BadgeColor>,
        required: false,
        default: BadgeColor.SLATE_600,
        validator: (color: BadgeColor) => Object.values(BadgeColor).includes(color),
    },
});

const badgeClasses = computed(() => `bg-${props.color}`);
</script>

<style scoped>
.badge-enter-active {
    @apply transition-enter duration-200;
}

.badge-enter-from {
    @apply opacity-0 scale-75;
}

.badge-leave-active {
    @apply transition-opacity duration-150;
}

.badge-leave-to {
    @apply opacity-0;
}
</style>
