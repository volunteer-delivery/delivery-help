<template>
    <ButtonRoot
        class="block outline-none"
        :class="tagClasses"
        :disabled="disabled || loading"
    >
        <span class="[display:inherit] h-full" v-visible="!loading">
            <slot />
        </span>

        <AppSpinner class="absolute top-0 left-0 w-full h-full" v-if="loading" />
    </ButtonRoot>
</template>

<script lang="ts" setup>
import type { FunctionalComponent, PropType } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { ButtonLook, ButtonSize } from '~/enums';
import { RippleColor } from '~/directives/ripple';
import { NuxtLink } from '#components';
import { vVisible } from '#imports';

type ButtonSizeConfig = Record<ButtonSize, string>;
type ButtonRippledLook = ButtonLook.PRIMARY | ButtonLook.ICON_PRIMARY;

const BUTTON_SIZES: Record<ButtonLook, ButtonSizeConfig> = {
    [ButtonLook.RAW]: {
        sm: '',
        md: '',
        lg: '',
    },
    [ButtonLook.ICON]: {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-4',
    },
    [ButtonLook.ICON_PRIMARY]: {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-4',
    },
    [ButtonLook.PRIMARY]: {
        sm: 'py-1 px-1.5 text-sm',
        md: 'py-2 px-2.5 text-sm',
        lg: 'py-3 px-4 text-md',
    },
    [ButtonLook.LINK]: {
        sm: 'py-1 px-1.5 text-sm',
        md: 'py-2 px-2.5 text-sm',
        lg: 'py-3 px-4 text-md',
    },
};

const props = defineProps({
    look: {
        type: String as PropType<ButtonLook>,
        required: false,
        validator: (type: ButtonLook) => Object.values(ButtonLook).includes(type),
        default: ButtonLook.RAW,
    },
    size: {
        type: String as PropType<ButtonSize>,
        required: false,
        default: '',
        validator: (size: ButtonSize) => !size || Object.values(ButtonSize).includes(size),
    },
    to: {
        type: [String, Object] as PropType<RouteLocationRaw>,
        required: false,
        default: '',
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    loading: {
        type: Boolean,
        required: false,
        default: false,
    },
    ripple: {
        type: String as PropType<RippleColor>,
        required: false,
        default: (props: { look: ButtonLook }): RippleColor | null => {
            const colors: Pick<Record<ButtonLook, RippleColor>, ButtonRippledLook> = {
                [ButtonLook.PRIMARY]: RippleColor.SLATE_50,
                [ButtonLook.ICON_PRIMARY]: RippleColor.SLATE_50,
            };
            return colors[props.look as ButtonRippledLook] || null;
        },
    },
});

const tagClasses = computed(() => ({
    [BUTTON_SIZES[props.look][props.size!]]: props.size,
    'transition-colors hover:bg-gray-200 focus:bg-gray-200 text-gray-600 disabled:text-gray-400 rounded-full flex': props.look === ButtonLook.ICON,
    'transition-button-primary bg-blue-800 focus:bg-blue-700 rounded-full text-white flex shadow-md active:shadow-xl disabled:shadow': props.look === ButtonLook.ICON_PRIMARY,
    'transition-button-primary bg-blue-800 focus:bg-blue-700 rounded text-white block tracking-wider shadow-md active:shadow-xl disabled:shadow': props.look === ButtonLook.PRIMARY,
    'transition-colors hover:bg-gray-100 focus:bg-gray-100 rounded text-gray-600 disabled:text-gray-400': props.look === ButtonLook.LINK,
}));

interface IButtonRootAttrs {
    class: string[];
    [attr: string]: unknown;
}

function withRelativePosition(attrs: Record<string, unknown>): IButtonRootAttrs {
    const classes = new Set((attrs.class as string || '').split(' '));

    if (!classes.has('absolute')) {
        classes.add('relative');
    }

    return { ...attrs, class: Array.from(classes) };
}

const ButtonRoot: FunctionalComponent = (_, { attrs: inputAttrs, slots }) => {
    const attrs = withRelativePosition(inputAttrs);

    if (props.ripple) attrs.class.push('overflow-clip');

    const node = props.to
        ? h(NuxtLink, { to: props.to, ...attrs }, slots.default!)
        : h('button', { type: 'button', ...attrs }, slots.default!());

    return props.ripple ? withDirectives(node, [[vRipple, null, '', { [props.ripple]: true }]]) : node;
};
</script>
