<template>
    <div class="flex items-center">
        <input
            class="border-none py-1.5 w-full outline-none grow"
            v-model="model.data"
        >

        <div class="ml-2" v-if="$slots.append">
            <slot name="append" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {IFormFieldModel} from "~/composables/use-form";
import {FORM_FIELD_PROVIDER} from "./form-context";

const model = inject<IFormFieldModel<string>>(FORM_FIELD_PROVIDER)!;
model.registerEnteredCheck((value) => !!value);
</script>
