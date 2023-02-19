<template>
    <label
        class="border-2 border-gray-300 hover:border-blue-800 rounded w-6 h-6 flex transition-colors"
        :class="wrapperClasses"
    >
        <input
            type="checkbox"
            class="hidden"
            :checked="modelValue"
            @input="$emit('update:modelValue', !modelValue)"
        >

        <Transition name="checkbox" :duration="{ enter: 200, leave: 150 }">
            <Icon class="m-auto text-blue-800" size="20px" v-if="modelValue">
                <CheckRound />
            </Icon>
        </Transition>
    </label>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils';
import { CheckRound } from '@vicons/material';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

defineEmits(['update:modelValue']);

const wrapperClasses = computed(() => ({
    'border-blue-800': props.modelValue,
}));
</script>

<style scoped>
.checkbox-enter-active {
    @apply transition-checkbox duration-200;
}

.checkbox-enter-from {
    @apply opacity-0 scale-50 -rotate-12;
}

.checkbox-leave-active {
    @apply transition-opacity duration-150;
}

.checkbox-leave-to {
    @apply opacity-0;
}
</style>
