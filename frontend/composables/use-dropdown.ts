import type { CSSProperties, Ref } from 'vue';
import { autoPlacement, size, useFloating } from '@floating-ui/vue';
import type { MiddlewareState } from '@floating-ui/vue';

type ElementRef = Ref<HTMLElement | null>;

export interface IDropdown {
    open(): void;
    close(): void;
    updatePosition(): void;
    styles: CSSProperties;
    isDisplaying: boolean;
}

export function useDropdown(relative: ElementRef, dropdown: ElementRef): IDropdown {
    const dropdownWidth = ref(0);

    const isDisplaying = ref(false);
    const open = (): void => void (isDisplaying.value = true);
    const close = (): void => void (isDisplaying.value = false);

    const { x, y, strategy, placement, update } = useFloating(relative, dropdown, {
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
    });

    const styles = computed<CSSProperties>(() => ({
        position: strategy.value,
        top: `${y.value ?? 0}px`,
        left: `${x.value ?? 0}px`,
        width: `${dropdownWidth.value}px`,
        transformOrigin: placement.value === 'top' ? 'bottom left' : 'top left',
    }));

    return reactive({
        open,
        close,
        updatePosition: update,
        isDisplaying,
        styles,
    });
}
