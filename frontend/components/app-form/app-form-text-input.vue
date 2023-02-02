<template>
    <div class="flex items-center">
        <input
            class="border-none py-1.5 w-full outline-none grow"
            v-model="modelValue"
        >

        <div class="ml-2" v-if="$slots.append">
            <slot name="append" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {FORM_FIELD_PROVIDER, IFormFieldContext} from './form-field-context';

const context = inject<IFormFieldContext<string>>(FORM_FIELD_PROVIDER)!;
context.registerValueEntered((value) => !!value);

const modelValue = computed<string>({
    get: () => context.model.data,
    set: (value) => context.model.data = value
});
</script>
