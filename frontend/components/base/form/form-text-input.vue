<template>
    <div class="flex items-center">
        <input
            class="border-none py-1.5 w-full outline-none grow"
            :value="modelValue"
            @input="onInput"
        >

        <div class="ml-2" v-if="$slots.append">
            <slot name="append" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {FORM_FIELD_PROVIDER, IFormFieldContext} from './form-field-context';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const fieldContext = inject<IFormFieldContext>(FORM_FIELD_PROVIDER)!;
fieldContext.setValueEntered(!!props.modelValue);

function onInput(event: InputEvent): void {
    const value = (event.target as HTMLInputElement).value;
    fieldContext.setValueEntered(!!value);
    emit('update:modelValue', value);
}
</script>
