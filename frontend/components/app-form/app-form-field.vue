<template>
    <label
        class="block border-b border-b-gray-500 w-full relative pt-4"
        ref="fieldRef"
        @click="onClick"
    >
        <span class="absolute left-0 top-7 transition-all origin-top-left" :class="labelClasses">
            {{ label }}
        </span>

        <slot />

        <span
            class="block border-b-2 w-full scale-x-0 transition-all absolute left-0 -bottom-px"
            :class="underlineClasses"
        />
    </label>
</template>

<script lang="ts" setup>
import {onClickOutside} from '@vueuse/core'
import {IFormModel, IFormFieldModel} from "~/composables/use-form";
import {FORM_PROVIDER, FORM_FIELD_PROVIDER} from "./form-context";

const props = defineProps({
    label: {
        type: String,
        required: true
    },

    id: {
        type: String,
        required: true
    }
});

const formModel = inject<IFormModel<any>>(FORM_PROVIDER)!;
const fieldModel = formModel.field(props.id);

const fieldRef = ref(null);

const isClickedInside = ref(false);
const isActive = computed(() => isClickedInside.value || fieldModel.isEntered)

const onClick = () => isClickedInside.value = true;

onClickOutside(fieldRef, () => isClickedInside.value = false)

const labelClasses = computed(() => ({
    '-translate-y-full scale-75': isActive.value,
    'text-blue-700': isClickedInside.value,
    'text-gray-500': !isClickedInside.value
}));

const underlineClasses = computed(() => ({
    'scale-x-100': isActive.value,
    'border-b-blue-700': isClickedInside.value,
    'border-b-gray-500': !isClickedInside.value,
}));

provide<IFormFieldModel<any>>(FORM_FIELD_PROVIDER, fieldModel);
</script>
