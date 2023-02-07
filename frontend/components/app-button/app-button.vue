<template>
    <AppButtonTag :to="to" :ripple="ripple" class="outline-none" :class="tagClasses">
        <slot />
    </AppButtonTag>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { RouteLocationRaw } from 'vue-router';
import { ButtonSize, ButtonType } from "~/enums";

type ButtonSizeConfig = Record<ButtonType, string>;
type ButtonTypeConfig = Record<ButtonSize, ButtonSizeConfig>;

const BUTTON_TYPES: ButtonTypeConfig = {
    sm: {
        icon: 'p-1',
        primary: 'py-1 px-1.5 text-sm'
    },
    md: {
        icon: 'p-2',
        primary: 'py-2 px-2.5 text-sm'
    }
};

const props = defineProps({
    type: {
        type: String as PropType<ButtonType>,
        required: true,
        validator: (type: ButtonType) => Object.values(ButtonType).includes(type)
    },
    size: {
        type: String as PropType<ButtonSize>,
        required: false,
        validator: (size: ButtonSize) => !size || Object.values(ButtonSize).includes(size)
    },
    to: {
        type: [String, Object] as PropType<RouteLocationRaw>,
        required: false,
        default: ''
    }
});

const tagClasses = computed(() => ({
    [BUTTON_TYPES[props.size!][props.type]]: props.size,
    'transition-colors hover:bg-gray-200 rounded-full flex': props.type === ButtonType.ICON,
    'transition-button-primary bg-blue-800 focus:bg-blue-700 rounded text-white block tracking-wider shadow-md active:shadow-xl': props.type === ButtonType.PRIMARY
}));

const ripple = computed(() => [ButtonType.PRIMARY].includes(props.type));
</script>
