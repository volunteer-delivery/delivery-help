import type { Ref, ComponentPublicInstance } from 'vue';

interface ISwipeModalOptions {
    onClose(): void;
}

interface ISwipeModal {
    offsetY: number;
}

export function useSwipeModal(modalRef: Ref<ComponentPublicInstance | null>, options: ISwipeModalOptions): ISwipeModal {
    const windowSize = useWindowSize();
    const safeZone = computed(() => windowSize.height.value / 4);
    const headerEl = computed<HTMLElement | null>(() => {
        return modalRef.value?.$el.querySelector('[data-modal-header]');
    });
    const offsetY = ref(0);

    const swipe = useSwipe(headerEl, {
        threshold: 1,

        onSwipe: () => {
            offsetY.value = Math.max(-swipe.lengthY.value, 0);

            if (offsetY.value >= safeZone.value) {
                options.onClose();
            }
        },

        onSwipeEnd: () => {
            if (offsetY.value < safeZone.value) {
                offsetY.value = 0;
            }
        },
    });

    return reactive({ offsetY });
}
