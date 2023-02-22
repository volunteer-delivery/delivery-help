import type { CSSProperties } from 'vue';
import { autoPlacement, size, useFloating  } from '@floating-ui/vue';
import type { MiddlewareState } from '@floating-ui/vue';
import type { ElementRef } from '~/composables/use-element-ref';

export interface IDropdownOptions {
    fullSize?: boolean;
}

export interface IDropdown {
    open(): void;
    close(): void;
    updatePosition(): void;
    styles: CSSProperties;
    isDisplaying: boolean;
}

export function useDropdown(relative: ElementRef, dropdown: ElementRef, options: IDropdownOptions = {}): IDropdown {
    const device = useDevice();
    const dropdownWidth = ref(0);

    const isDisplaying = ref(false);
    const open = (): void => void (isDisplaying.value = true);
    const close = (): void => void (isDisplaying.value = false);

    const { x, y, strategy, placement, update } = useFloating(relative, dropdown, {
        placement: 'top',
        middleware: [
            autoPlacement({
                allowedPlacements: [
                    'top-start',
                    'top',
                    'top-end',
                    'bottom-start',
                    'bottom',
                    'bottom-end',
                ],
            }),
            size({
                apply(args: MiddlewareState): void {
                    dropdownWidth.value = args.rects.reference.width;
                },
            }),
        ],
    });

    const sizeStyles = computed(() => {
        const isFullSize = device.isMobileOrTablet && options.fullSize !== false;
        const width = `${dropdownWidth.value}px`;
        return isFullSize ? { width } : { maxWidth: width };
    });

    const transformOrigin = computed(() => {
        const [y, x = 'start'] = placement.value.split('-');
        const originY = y === 'top' ? 'bottom' : 'top';
        const originX = x === 'start' ? 'left' : 'right';
        return [originY, originX].join(' ');
    });

    const styles = computed<CSSProperties>(() => ({
        position: strategy.value,
        top: `${y.value ?? 0}px`,
        left: `${x.value ?? 0}px`,
        transformOrigin: transformOrigin.value,
        ...sizeStyles.value,
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
