<template>
    <div>
        <label
            class="block border-b w-full relative pt-4"
            :class="underlineColorClass"
            ref="fieldRef"
            @click="onClick"
        >
            <span class="absolute left-0 top-6 transition-font-field origin-top-left" :class="labelClasses">
                {{ label }}
            </span>

            <slot/>

            <span
                class="block border-b-2 w-full scale-x-0 transition-font-field absolute left-0 -bottom-px"
                :class="underlineClasses"
            />
        </label>

        <transition name="font-field-error" duration="150">
            <p class="text-xs text-red-600 pt-1" v-if="fieldModel.isInvalid">
                {{ fieldModel.errors[0] }}
            </p>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import {onClickOutside} from '@vueuse/core'
import {IFormModel, IFormFieldModel} from "~/composables/use-form";
import {InjectionToken} from "~/enums";

// Dynamic Classes
// text-red-600 border-b-red-600
// text-blue-700 border-b-blue-700
// text-gray-500 border-b-gray-500
// text-gray-400 border-b-gray-400

const props = defineProps({
    id: {
        type: String,
        required: true
    },

    label: {
        type: String,
        required: true
    },

    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
});

const formModel = inject<IFormModel<any>>(InjectionToken.FORM)!;
const fieldModel = formModel.field(props.id);

const fieldRef = ref(null);

const isClickedInside = ref(false);
const isActive = computed(() => isClickedInside.value || fieldModel.isEntered)

const onClick = () => isClickedInside.value = true;

onClickOutside(fieldRef, () => {
    if (isClickedInside.value) fieldModel.validate();
    isClickedInside.value = false;
})

const stateColor = computed(() => {
    if (fieldModel.isDisabled) {
        return 'gray-400';
    }
    if (fieldModel.isInvalid) {
        return 'red-600';
    }
    if (isClickedInside.value) {
        return 'blue-700';
    }
    return 'gray-500';
});

const labelClasses = computed(() => [
    {
        '-translate-y-full scale-75': isActive.value,
        'animate-shake': fieldModel.isInvalid
    },
    `text-${stateColor.value}`
]);

const underlineColorClass = computed(() => `border-b-${stateColor.value}`);

const underlineClasses = computed(() => [
    {'scale-x-100': isActive.value},
    underlineColorClass.value
]);

provide<IFormFieldModel<any>>(InjectionToken.FORM_FIELD, fieldModel);
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
