import type {Ref, ComponentPublicInstance} from "vue";

interface ISwipeModalOptions {
    onClose(): void;
}

interface ISwipeModal {
    offsetY: number;
}

export function useSwipeModal(modalRef: Ref<ComponentPublicInstance | null>, options: ISwipeModalOptions): ISwipeModal {
    const SAFE_ZONE = 100;
    const headerEl = computed<HTMLElement | null>(() => {
        return modalRef.value?.$el.querySelector('[data-modal-header]');
    });
    const offsetY = ref(0);

    const swipe = useSwipe(headerEl, {
        threshold: 1,

        onSwipe: () => {
            offsetY.value = Math.max(-swipe.lengthY.value, 0);

            if (offsetY.value >= SAFE_ZONE) {
                options.onClose();
            }
        },

        onSwipeEnd: () => {
            if (offsetY.value < SAFE_ZONE) {
                offsetY.value = 0;
            }
        }
    });

    return reactive({ offsetY });
}
