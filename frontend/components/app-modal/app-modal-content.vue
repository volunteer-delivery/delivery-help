<template>
    <component
        :is="modal.content"
        v-bind="modal.props"
        class="modal-content absolute left-0 bottom-0 w-full"
        ref="modalRef"
        :style="modalStyles"
        v-on-click-outside="modal.close"
        v-if="device.isMobileOrTablet"
    />

    <component
        :is="modal.content"
        v-bind="modal.props"
        class="modal-content absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        v-on-click-outside="modal.close"
        v-else
    />
</template>

<script lang="ts" setup>
import type {ComponentPublicInstance, PropType} from "vue";
import {vOnClickOutside} from '@vueuse/components'
import {Modal} from "~/stores/modal-store";
import {ACTIVE_MODAL} from "~/composables/use-active-modal";

const props = defineProps({
    modal: {
        type: Object as PropType<Modal>,
        required: true
    }
});

const device = useDevice();
const modalRef = ref<ComponentPublicInstance | null>(null);

const swipe = device.isMobileOrTablet
    ? useSwipeModal(modalRef, { onClose: props.modal.close })
    : { offsetY: 0 };

const modalStyles = computed(() => {
    if (!swipe.offsetY) return null;
    return { transform: `translateY(${swipe.offsetY}px)` };
});

provide(ACTIVE_MODAL, props.modal);
</script>
