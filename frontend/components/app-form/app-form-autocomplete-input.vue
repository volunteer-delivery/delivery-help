<template>
    <AppFormTextInput
        @focusin="dropdown.open"
        @focusout="dropdown.close"
    />

    <Transition name="autocomplete" :duration="{ enter: 200, leave: 150 }">
        <ul
            class="m-0 p-0 pt-2 bg-white shadow rounded-sm z-[100]"
            :style="dropdown.styles"
            ref="dropdownRef"
            v-if="dropdown.isDisplaying"
        >
            <li v-for="option of availableOptions" :key="option.id || option.value">
                <AppButton
                    class="text-left w-full px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 transition-colors"
                    :ripple="RippleColor.BLUE_800"
                    @click="apply(option)"
                >
                    <AppHighlightText
                        :text="option.title || option.value"
                        :highlight="model.data"
                    />
                </AppButton>
            </li>

            <li class="border-t border-t-gray-100">
                <AppButton class="w-full py-2" @click="dropdown.close">
                    Закрити
                </AppButton>
            </li>
        </ul>
    </Transition>
</template>

<script lang="ts" setup>
import type { PropType, Ref } from 'vue';
import { IFormAutocompleteOption, IFormFieldModel } from '~/composables/use-form';
import { InjectionToken } from '~/enums';

const props = defineProps({
    options: {
        type: Array as PropType<IFormAutocompleteOption[]>,
        required: true,
    },
});

const model = inject<IFormFieldModel<string>>(InjectionToken.FORM_FIELD)!;

const inputRef = inject<Ref<HTMLElement | null>>(InjectionToken.FORM_FIELD_REF)!;
const dropdownRef = ref(null);

const dropdown = useDropdown(inputRef, dropdownRef);

function apply(option: IFormAutocompleteOption): void {
    model.data = option.value;
}

const availableOptions = computed<IFormAutocompleteOption[]>(() => {
    const options = props.options.filter((option) => option.value.toLowerCase().includes(model.data.toLowerCase()));
    return options.slice(0, 10);
});

const availableOptionsCount = computed(() => availableOptions.value.length);
watch(availableOptionsCount, () => dropdown.updatePosition());
</script>

<style scoped>
.autocomplete-enter-active {
    @apply transition-dropdown duration-200;
}

.autocomplete-enter-from {
    @apply scale-75 opacity-0;
}

.autocomplete-leave-active {
    @apply transition-opacity duration-150;
}

.autocomplete-leave-to {
    opacity: 0;
}
</style>
