<template>
    <AppFormTextInput
        ref="inputRef"
        @focusin="showDropdown"
        @focusout="hideDropdown"
    />

    <Transition name="autocomplete" :duration="{ enter: 200, leave: 150 }">
        <ul
            class="m-0 p-0 bg-white shadow rounded-sm"
            :style="dropdownStyles"
            ref="dropdownRef"
            v-if="dropdownDisplaying"
        >
            <li v-for="option of availableOptions" :key="option.id">
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
        </ul>
    </Transition>
</template>

<script lang="ts" setup>
import type { CSSProperties, PropType, Ref } from 'vue';
import { useFloating, size, autoPlacement } from '@floating-ui/vue';
import type { MiddlewareState } from '@floating-ui/vue';
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
const dropdownWidth = ref(0);

const dropdownDisplaying = ref(false);
const showDropdown = (): void => void (dropdownDisplaying.value = true);
const hideDropdown = (): void => void (dropdownDisplaying.value = false);

function apply(option: IFormAutocompleteOption): void {
    model.data = option.value;
}

const floating = reactive(useFloating(inputRef, dropdownRef, {
    middleware: [
        size({
            apply(args: MiddlewareState): void {
                dropdownWidth.value = args.rects.reference.width;
            },
        }),
        autoPlacement({
            allowedPlacements: ['top', 'bottom'],
        }),
    ],
}));

const dropdownStyles = computed<CSSProperties>(() => ({
    position: floating.strategy,
    top: `${floating.y ?? 0}px`,
    left: `${floating.x ?? 0}px`,
    width: `${dropdownWidth.value}px`,
    transformOrigin: floating.placement === 'top' ? 'bottom left' : 'top left',
}));

const availableOptions = computed<IFormAutocompleteOption[]>(() => {
    const options = props.options.filter((option) => option.value.toLowerCase().includes(model.data.toLowerCase()));
    return options.slice(0, 10);
});

const availableOptionsCount = computed(() => availableOptions.value.length);
watch(availableOptionsCount, () => floating.update());
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
