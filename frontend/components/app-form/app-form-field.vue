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
import {CheckValueEntered, FORM_FIELD_PROVIDER, IFormFieldContext} from "./form-field-context";
import {FORM_PROVIDER, IFormContext} from "~/components/app-form/form-context";

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

const context = inject<IFormContext<any>>(FORM_PROVIDER)!;
const model = context.model.field(props.id);

const fieldRef = ref(null);

let checkValueEntered: CheckValueEntered<any>;
const isValueEntered = ref(false);

const isClickedInside = ref(false);
const isActive = computed(() => isClickedInside.value || isValueEntered.value)

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

provide<IFormFieldContext<any>>(FORM_FIELD_PROVIDER, {
    registerValueEntered: (check) => checkValueEntered = check,
    model
});

watch(() => model.data, (value) => isValueEntered.value = checkValueEntered(value));
onMounted(() => isValueEntered.value = checkValueEntered(model.data));
</script>
