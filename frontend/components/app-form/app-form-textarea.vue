<template>
    <div class="textarea w-full py-1.5" :data-value="model.data">
        <textarea
            rows="1"
            class="border-none w-full outline-none bg-transparent resize-none overflow-clip"
            v-model="model.data"
        />
    </div>
</template>

<script lang="ts" setup>
import type { IFormFieldModel } from '~/composables/use-form';
import { InjectionToken } from '~/enums';

const model = inject<IFormFieldModel<string>>(InjectionToken.FORM_FIELD)!;
model.registerEnteredCheck((value) => !!value);
</script>

<style scoped>
.textarea {
    display: grid;
}

.textarea::after {
    content: attr(data-value) " ";
    white-space: pre-wrap;
    visibility: hidden;
}

.textarea > textarea,
.textarea::after {
    grid-area: 1 / 1 / 2 / 2;
}
</style>
