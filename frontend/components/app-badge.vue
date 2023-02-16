<template>
    <div class="relative">
        <slot />

        <p
            class="badge absolute rounded-full m-0 text-white h-5 min-w-[20px] flex items-center justify-center leading-none text-xs transition-colors z-50"
            :class="badgeClasses"
            v-if="show"
        >
            <span>{{ content }}</span>
        </p>
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
