<template>
    <section class="bg-white rounded-t-2xl md:rounded w-full" ref="rootRef">
        <header class="border-b border-r-slate-200 flex justify-between items-center py-2 pl-4 pr-2" data-modal-header>
            <h2 class="m-0 text-lg font-semibold tracking-wide">
                {{ title }}
            </h2>

            <AppButton
                class="md:ml-4 text-gray-400 focus:text-gray-600 hover:text-gray-600"
                look="icon"
                size="md"
                data-no-initial-focus
                @click="modal.close"
            >
                <Icon size="24">
                    <CloseRound />
                </Icon>
            </AppButton>
        </header>

        <main class="px-4 pt-2 pb-4">
            <slot />
        </main>
    </section>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils';
import CloseRound from '@vicons/material/CloseRound';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    initialFocus: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const modal = useActiveModal();

const rootRef = ref(null);

useFocusTrap(rootRef, {
    immediate: props.initialFocus,
    initialFocus: ':where(button, a, input, select):not(:disabled, [data-no-initial-focus])',
});
</script>
