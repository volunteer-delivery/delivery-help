<template>
    <form @submit.prevent="$emit('submit')">
        <slot />
    </form>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import {IFormModel} from "~/composables/use-form";
import {InjectionToken} from "~/enums";

const props = defineProps({
    model: {
        type: Object as PropType<IFormModel<any>>,
        required: true
    },

    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
});

defineEmits(['submit'])

provide<IFormModel<any>>(InjectionToken.FORM, props.model);
watch(toRef(props, 'disabled'), props.model!.setDisabled, { immediate: true });
</script>
