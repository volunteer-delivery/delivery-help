<template>
    <component :is="tag" v-bind="tagAttrs" :class="tagClasses">
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { RouteLocationRaw } from 'vue-router';
import { NuxtLink } from "#components";
import { ButtonSize, ButtonType } from "~/enums";

type ButtonSizeConfig = Record<ButtonType, string>;
type ButtonTypeConfig = Record<ButtonSize, ButtonSizeConfig>;

const BUTTON_TYPES: ButtonTypeConfig = {
    sm: {
        icon: 'p-1'
    }
};

const props = defineProps({
    type: {
        type: String as PropType<ButtonType>,
        required: true,
        validator: (type: string) => type in ButtonType
    },
    size: {
        type: String as PropType<ButtonSize>,
        required: false,
        validator: (size: string) => !size || size in ButtonSize
    },
    to: {
        type: [String, Object] as PropType<RouteLocationRaw>,
        required: false,
        default: ''
    }
});

const tag = computed(() => props.to ? NuxtLink: 'button');
const linkAttrs = computed(() => ({ to: props.to }));
const buttonAttrs = computed(() => ({ type: 'button' }));
const tagAttrs = computed(() => props.to ? linkAttrs.value : buttonAttrs.value);

const tagClasses = computed(() => ({
    [BUTTON_TYPES[props.size!][props.type]]: props.size,
    'transition-colors hover:bg-gray-200 rounded-full flex': props.type === ButtonType.ICON
}))
</script>
