<template>
    <Render />
</template>

<script lang="ts" setup>
import type { FunctionalComponent } from 'vue';

interface HighlightPart {
    text: string;
    highlight: boolean;
}

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    highlight: {
        type: String,
        required: true,
    },
});

const regex = computed(() => new RegExp(`(.+)?(${props.highlight})(.+)?`, 'i'));

const matched = computed<HighlightPart[]>(() => {
    if (!props.highlight) {
        return [{ text: props.text, highlight: false }];
    }

    const matched = props.text.match(regex.value);

    if (!matched) {
        return [{ text: props.text, highlight: false }];
    }

    const parts: HighlightPart[] = [];

    if (matched[1]) parts.push({ text: matched[1], highlight: false });
    parts.push({ text: matched[2], highlight: true });
    if (matched[3]) parts.push({ text: matched[3], highlight: false });

    return parts;
});

const Render: FunctionalComponent = (_, context) => {
    return h('span', context.attrs, matched.value.map((part) => {
        return part.highlight ? h('mark', { class: 'bg-yellow-200' }, part.text) : part.text;
    }));
};
</script>
