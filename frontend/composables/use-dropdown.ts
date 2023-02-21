import type { CSSProperties, Ref } from 'vue';
import { autoPlacement, size, useFloating  } from '@floating-ui/vue';
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
    const device = useDevice();
    const dropdownWidth = ref(0);

    const isDisplaying = ref(false);
    const open = (): void => void (isDisplaying.value = true);
    const close = (): void => void (isDisplaying.value = false);

    const middlewares = [
        autoPlacement({
            allowedPlacements: ['bottom-start', 'top-start'],
        }),
    ];

    if (device.isMobileOrTablet) {
        middlewares.push(size({
            apply(args: MiddlewareState): void {
                dropdownWidth.value = args.rects.reference.width;
            },
        }));
    }

    const { x, y, strategy, placement, update } = useFloating(relative, dropdown, {
        placement: 'bottom',
        middleware: middlewares,
    });

    const styles = computed<CSSProperties>(() => ({
        position: strategy.value,
        top: `${y.value ?? 0}px`,
        left: `${x.value ?? 0}px`,
        width: device.isMobileOrTablet ? `${dropdownWidth.value}px` : undefined,
        transformOrigin: placement.value === 'top-start' ? 'bottom left' : 'top left',
    }));

    onClickOutside(dropdown, (event: PointerEvent) => {
        if (event.composedPath().includes(relative.value!)) {
            return;
        }
        close();
    });

    return reactive({
        open,
        close,
        updatePosition: update,
        isDisplaying,
        styles,
    });
}
