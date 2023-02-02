<template>
    <form>
        <slot />
    </form>
</template>

<script lang="ts" setup>
import {IFormContext, FORM_PROVIDER} from './form-context';
import {PropType} from "@vue/runtime-core";
import {IFormModel} from "~/composables/use-form";

const props = defineProps({
    model: {
        type: Object as PropType<IFormModel<any>>,
        required: true
    }
});

provide<IFormContext<any>>(FORM_PROVIDER, {
    model: props.model
});
</script>
