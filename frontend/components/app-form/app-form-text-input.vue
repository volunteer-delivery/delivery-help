<template>
    <div class="flex items-center">
        <input
            class="border-none py-1.5 w-full outline-none grow"
            :type="type"
            v-model="model.data"
        >
        <div class="ml-2" v-if="$slots.append">
            <slot name="append" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {IFormFieldModel} from "~/composables/use-form";
import {InjectionToken} from "~/enums";

defineProps({
    type: {
        type: String,
        required: false,
        default: 'text'
    }
});

const model = inject<IFormFieldModel<string>>(InjectionToken.FORM_FIELD)!;
model.registerEnteredCheck((value) => !!value);
</script>
