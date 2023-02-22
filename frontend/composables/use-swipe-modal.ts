import type { ElementRef, ElementRefValue } from '~/composables/use-element-ref';

interface ISwipeModalOptions {
    onClose(): void;
}

interface ISwipeModal {
    offsetY: number;
}

export function useSwipeModal(modalRef: ElementRef, options: ISwipeModalOptions): ISwipeModal {
    const headerEl = computed<ElementRefValue>(() => modalRef.value?.querySelector('[data-modal-header]') || null);

    const safeZone = computed<number>(() => {
        const modalHeight = modalRef.value?.offsetHeight || 0;
        return Math.max(50, modalHeight / 3);
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
