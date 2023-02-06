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

function Render(): VNode {
    const tag = props.to ? NuxtLink : 'button';
    const attrs = props.to ? { to: props.to } : { type: 'button' };
    const node = h(tag, attrs, slots.default!());
    return props.ripple ? withDirectives(node, [[ripple]]) : node;
}
</script>
