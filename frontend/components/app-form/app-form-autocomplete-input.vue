<template>
    <AppFormTextInput @focusin="dropdown.open" @focusout="dropdown.close" />

    <Transition name="dropdown" :duration="{ enter: 200, leave: 150 }">
        <ul
            class="m-0 p-0 pt-2 bg-white shadow rounded-sm z-[100] min-w-[150px]"
            :style="dropdown.styles"
            ref="dropdownRef"
            v-if="isAutocompleteDisplaying"
        >
            <li v-for="option of availableOptions" :key="option.id || option.value">
                <AppButton
                    class="text-left w-full px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 transition-colors"
                    @click="apply(option)"
                >
                    <AppHighlightText
                        :text="option.title || option.value"
                        :highlight="model.data"
                    />
                </AppButton>
            </li>

            <li class="border-t border-t-gray-100 hover:bg-gray-100 transition-colors">
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

const isAutocompleteDisplaying = computed(() => {
    return dropdown.isDisplaying && availableOptions.value.length;
});

const availableOptionsCount = computed(() => availableOptions.value.length);
watch(availableOptionsCount, () => dropdown.updatePosition());
</script>
