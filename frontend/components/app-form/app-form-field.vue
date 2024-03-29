<template>
    <div @focusin="focus" @focusout="unfocus">
        <label
            class="block border-b w-full relative pt-4"
            :class="underlineColorClass"
            ref="fieldRef"
        >
            <span class="absolute left-0 top-6 transition-font-field origin-top-left" :class="labelClasses">
                {{ label }}
            </span>

            <span class="flex min-h-[36px] w-full">
                <slot />
            </span>

            <span
                class="block border-b-2 w-full scale-x-0 transition-font-field absolute left-0 -bottom-px"
                :class="underlineClasses"
            />
        </label>

        <div class="overflow-y-hidden">
            <transition name="font-field-error" duration="150">
                <p class="text-xs text-red-600 pt-1" v-if="fieldModel.isInvalid">
                    {{ fieldModel.errors[0] }}
                </p>
            </transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { InjectionToken } from '~/enums';
import type { IFormModel, IFormFieldModel } from '~/composables/use-form';
import type { ElementRef, ElementRefValue } from '~/composables/use-element-ref';

// Dynamic Classes
// text-red-600 border-b-red-600
// text-blue-700 border-b-blue-700
// text-gray-500 border-b-gray-500
// text-gray-400 border-b-gray-400

const props = defineProps({
    id: {
        type: String,
        required: false,
        default: '',
    },

    model: {
        type: Object as PropType<IFormFieldModel<unknown>>,
        required: false,
        default: () => null,
    },

    label: {
        type: String,
        required: true,
    },

    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
});

function resolveFieldModel(): IFormFieldModel<unknown> {
    if (props.model) return props.model;
    const formModel = inject<IFormModel<Record<string, unknown>>>(InjectionToken.FORM)!;
    const fieldModel = formModel.field(props.id);

    if (!fieldModel) throw new Error('No model or id props specified');

    return fieldModel;
}

const fieldModel = resolveFieldModel();

const fieldRef = ref<ElementRefValue>(null);

const isFocused = ref(false);
const focus = (): void => void (isFocused.value = true);

function unfocus(): void {
    fieldModel.validate();
    isFocused.value = false;
}

const isActive = computed(() => isFocused.value || fieldModel.isEntered);

const stateColor = computed(() => {
    if (fieldModel.isDisabled) {
        return 'gray-400';
    }
    if (fieldModel.isInvalid) {
        return 'red-600';
    }
    if (isFocused.value) {
        return 'blue-700';
    }
    return 'gray-500';
});

const labelClasses = computed(() => [
    {
        '-translate-y-full scale-75': isActive.value,
        'animate-shake': fieldModel.isInvalid,
    },
    `text-${stateColor.value}`,
]);

const underlineColorClass = computed(() => `border-b-${stateColor.value}`);

const underlineClasses = computed(() => [
    { 'scale-x-100': isActive.value },
    underlineColorClass.value,
]);

provide<IFormFieldModel<unknown>>(InjectionToken.FORM_FIELD, fieldModel);
provide<ElementRef>(InjectionToken.FORM_FIELD_REF, fieldRef);
watch(toRef(props, 'disabled'), fieldModel.setDisabled, { immediate: true });
</script>

<style scoped>
.font-field-error-leave-active,
.font-field-error-enter-active {
    @apply transition-spacing
}

.font-field-error-leave-to,
.font-field-error-enter-from {
    @apply -mt-5
}

.font-field-error-leave-from,
.font-field-error-enter-to {
    @apply mt-0
}
</style>
