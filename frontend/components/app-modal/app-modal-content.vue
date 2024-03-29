<template>
    <component
        :is="modal.content"
        v-bind="modal.props"
        class="modal-content w-full mt-auto"
        ref="modalRef"
        :style="modalStyles"
        v-if="device.isMobileOrTablet"
    />

    <component
        :is="modal.content"
        v-bind="modal.props"
        class="modal-content m-auto md:max-w-[500px]"
        ref="modalRef"
        v-else
    />
</template>

<script lang="ts" setup>
import type { ComponentPublicInstance, CSSProperties, PropType } from 'vue';
import { Modal } from '~/stores/modal-store';
import { ACTIVE_MODAL } from '~/composables/use-active-modal';
import type { ElementRefValue } from '~/composables/use-element-ref';

const props = defineProps({
    modal: {
        type: Object as PropType<Modal>,
        required: true,
    },
});

const device = useDevice();
const modalRef = ref<ComponentPublicInstance | null>(null);
const modalEl = computed<ElementRefValue>(() => modalRef.value?.$el || null);

const swipe = device.isMobileOrTablet
    ? useSwipeModal(modalEl, { onClose: props.modal.close })
    : { offsetY: 0 };

const modalStyles = computed<CSSProperties | null>(() => {
    if (!swipe.offsetY) return null;
    return { transform: `translateY(${swipe.offsetY}px)` };
});

onClickOutside(modalEl, props.modal.close);

provide(ACTIVE_MODAL, props.modal);
</script>
