<template>
    <ButtonRoot
        class="block outline-none"
        :class="tagClasses"
        :disabled="disabled || loading"
    >
        <span class="block h-full" v-visible="!loading">
            <slot />
        </span>

        <AppSpinner class="absolute top-0 left-0 w-full h-full" v-if="loading" />
    </ButtonRoot>
</template>

<script lang="ts" setup>
import type {FunctionalComponent, PropType} from "vue";
import {RouteLocationRaw} from 'vue-router';
import {vVisible} from '#imports';
import {NuxtLink} from "#components";
import {ButtonLook, ButtonSize} from "~/enums";

type ButtonSizeConfig = Record<ButtonSize, string>;

const BUTTON_SIZES: Record<ButtonLook, ButtonSizeConfig> = {
    raw: {
        sm: '',
        md: '',
        lg: ''
    },
    icon: {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-4'
    },
    'icon-primary': {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-4'
    },
    primary: {
        sm: 'py-1 px-1.5 text-sm',
        md: 'py-2 px-2.5 text-sm',
        lg: 'py-3 px-4 text-md'
    }
};

const props = defineProps({
    look: {
        type: String as PropType<ButtonLook>,
        required: false,
        validator: (type: ButtonLook) => Object.values(ButtonLook).includes(type),
        default: ButtonLook.RAW
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
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    loading: {
        type: Boolean,
        required: false,
        default: false
    }
});

const tagClasses = computed(() => ({
    [BUTTON_SIZES[props.look][props.size!]]: props.size,
    'transition-colors hover:bg-gray-200 text-gray-600 disabled:text-gray-400 rounded-full flex': props.look === ButtonLook.ICON,
    'transition-button-primary bg-blue-800 focus:bg-blue-700 rounded-full text-white flex shadow-md active:shadow-xl disabled:shadow': props.look === ButtonLook.ICON_PRIMARY,
    'transition-button-primary bg-blue-800 focus:bg-blue-700 rounded text-white block tracking-wider shadow-md active:shadow-xl disabled:shadow': props.look === ButtonLook.PRIMARY
}));

const ripple = computed(() => [ButtonLook.PRIMARY, ButtonLook.ICON_PRIMARY].includes(props.look));

function withRelativePosition(attrs: Record<string, unknown>) {
    const classes = new Set((attrs.class as string || '').split(' '));

    if (!classes.has('absolute')) {
        classes.add('relative');
    }

    return { ...attrs, class: Array.from(classes) };
}

const ButtonRoot: FunctionalComponent = (_, { attrs: inputAttrs, slots }) => {
    const attrs = withRelativePosition(inputAttrs);

    const node = props.to
        ? h(NuxtLink, {to: props.to, ...attrs}, slots.default!)
        : h('button', {type: 'button', ...attrs}, slots.default!());
    return ripple.value ? withDirectives(node, [[vRipple]]) : node;
};
</script>
