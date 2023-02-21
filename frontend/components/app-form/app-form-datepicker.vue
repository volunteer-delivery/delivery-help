<template>
    <div class="self-center flex w-full">
        <AppButton class="w-full text-left grow" @click="dropdown.open">
            <slot name="preview" :model="model">
                {{ datePreview }}
            </slot>
        </AppButton>

        <AppButton class="ml-2" look="icon" size="sm" @click="clear" v-if="model.isEntered">
            <Icon size="24">
                <CloseRound />
            </Icon>
        </AppButton>
    </div>

    <Transition name="dropdown" :duration="{ enter: 200, leave: 150 }">
        <div
            class="bg-white shadow rounded-sm z-[100]"
            :style="dropdown.styles"
            ref="dropdownRef"
            v-if="dropdown.isDisplaying"
        >
            <VueDatePicker
                v-model="model.data"
                :range="isPickerRange"
                :min-date="min"
                :enable-time-picker="false"
                :month-change-on-scroll="false"
                locale="uk-UA"
                inline
            >
                <template #action-row="{ internalModelValue }">
                    <AppButton class="w-full py-2 hover:bg-gray-100 transition-colors" @click="apply(internalModelValue)">
                        Закрити
                    </AppButton>
                </template>
            </VueDatePicker>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import '@vuepic/vue-datepicker/dist/main.css';

import type { Ref } from 'vue';
import { Icon } from '@vicons/utils';
import { CloseRound } from '@vicons/material';
import VueDatePicker from '@vuepic/vue-datepicker';
import type { IFormFieldModel } from '~/composables/use-form';
import { InjectionToken } from '~/enums';

defineProps({
    min: {
        type: Date,
        required: false,
        default: null,
    },
});

type DateRange = [Date?, Date?];
type DataType = null | Date | DateRange;
const model = inject<IFormFieldModel<DataType>>(InjectionToken.FORM_FIELD)!;

const checkIsRange = (value: DataType): value is DateRange => Array.isArray(value);
const isPickerRange = computed(() => checkIsRange(model.data));

const datePreview = computed<string | null>(() => {
    if (checkIsRange(model.data)) {
        return model.data.map((date) => formatDate(date!)).join(' ~ ');
    }
    return model.data && formatDate(model.data);
});

model.registerEnteredCheck((value) => checkIsRange(value) ? !!value.length : !!value);

const inputRef = inject<Ref<HTMLElement | null>>(InjectionToken.FORM_FIELD_REF)!;
const dropdownRef = ref(null);

const dropdown = useDropdown(inputRef, dropdownRef);

function apply(date: DataType): void {
    if (date) model.data = date;
    dropdown.close();
}

function clear(): void {
    model.data = checkIsRange(model.data) ? [] : null;
}
</script>

<style scoped>
:deep(.dp__action_row) {
    @apply !w-full border-t border-t-gray-100 p-0;
}

:deep(.dp__menu) {
    @apply border-none;
    --dp-border-color: theme('colors.gray.100');
    --dp-primary-color: theme('colors.blue.800');
    --dp-secondary-color: theme('colors.gray.200');
    --dp-text-color: theme('colors.black');
    --dp-primary-text-color: theme('colors.white');
    --dp-hover-color: theme('colors.gray.100');
    --dp-icon-color: theme('colors.gray.500');
}

:deep(.dp__calendar_header) {
    @apply font-medium;
}
</style>
