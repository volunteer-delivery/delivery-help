<template>
    <Render />
</template>

<script lang="ts" setup>
import {PropType, VNode} from "vue";
import {RouteLocationRaw} from "vue-router";
import {NuxtLink} from "#components";

const props = defineProps({
    to: {
        type: [String, Object] as PropType<RouteLocationRaw>,
        required: false
    },
    ripple: {
        type: Boolean,
        required: true
    }
});

const slots = useSlots();
const attrs = useAttrs();

function Render(): VNode {
    const node = props.to
        ? h(NuxtLink, {to: props.to, ...attrs}, slots.default!)
        : h('button', {type: 'button', ...attrs}, slots.default!());

    return props.ripple ? withDirectives(node, [[vRipple]]) : node;
}
</script>
