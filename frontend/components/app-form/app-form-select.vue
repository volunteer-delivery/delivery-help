<template>
    <AppButton class="w-full text-left self-center" @click="dropdown.open">
        <slot name="preview" :selected="selectedOptions">
            {{ selectedOptionsPreview }}
        </slot>
    </AppButton>

    <Transition name="dropdown" :duration="{ enter: 200, leave: 150 }">
        <ul
            class="m-0 p-0 pt-2 bg-white shadow rounded z-[100] min-w-[150px]"
            :style="dropdown.styles"
            ref="dropdownRef"
            v-if="dropdown.isDisplaying"
        >
            <li v-for="option of options" :key="option.id || option.value">
                <AppButton
                    class="text-left w-full flex"
                    look="link"
                    size="lg"
                    @click="apply(option)"
                >
                    <AppCheckbox
                        class="mr-4"
                        :model-value="isOptionSelected(option)"
                    />
                    <span>{{ option.title || option.value }}</span>
                </AppButton>
            </li>

            <li class="border-t border-t-gray-100">
                <AppButton
                    class="text-left w-full"
                    look="link"
                    size="lg"
                    @click="dropdown.close"
                >
                    Закрити
                </AppButton>
            </li>
        </ul>
    </Transition>
</template>

<script lang="ts" setup>
import type { PropType, Ref } from 'vue';
import type { IFormFieldModel, IFormSelectOption } from '~/composables/use-form';
import { InjectionToken } from '~/enums';
import type { ElementRef } from '~/composables/use-element-ref';

const props = defineProps({
    options: {
        type: Array as PropType<IFormSelectOption[]>,
        required: true,
    },
});

const model = inject<IFormFieldModel<unknown>>(InjectionToken.FORM_FIELD)!;

model.registerEnteredCheck((value) => {
    return Array.isArray(value) ? !!value.length : !!value;
});

const selectedOptions = computed(() => {
    const selectedValues = Array.isArray(model.data) ? model.data : [model.data];
    return props.options.filter((option) => selectedValues.includes(option.value));
});

const selectedOptionsPreview = computed(() => {
    return selectedOptions.value.map((option) => option.title || option.value).join(', ');
});

const inputRef = inject<ElementRef>(InjectionToken.FORM_FIELD_REF)!;
const dropdownRef = ref(null);

const dropdown = useDropdown(inputRef, dropdownRef);

function isOptionSelected(option: IFormSelectOption): boolean {
    if (Array.isArray(model.data)) {
        return model.data.includes(option.value);
    }
    return model.data === option.value;
}

function apply(option: IFormSelectOption): void {
    if (!Array.isArray(model.data)) {
        model.data = option.value;
        dropdown.close();
        return;
    }
    if (model.data.includes(option.value)) {
        model.data = model.data.filter((item) => item !== option.value);
        return;
    }
    model.data = model.data.concat(option.value);
}
</script>
