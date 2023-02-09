import {DirectiveBinding, ObjectDirective} from 'vue';

interface IRipplePosition {
    x: number;
    y: number;
}

enum RippleColor {
    SLATE_50 = 'slate-50',
    BLUE_800 = 'blue-800'
}

interface IRippleDirectiveState {
    color: RippleColor;
    activeAnimationTimeout: any | null;
}

const storage = useWeakState<HTMLElement, IRippleDirectiveState>();

function completeRipple(el: HTMLElement): void {
    for (const className of el.classList) {
        if (className.startsWith('ripple')) {
            el.classList.remove(className);
        }
    }
    el.style.removeProperty('--ripple-size');
    el.style.removeProperty('--ripple-x');
    el.style.removeProperty('--ripple-y');
    el.style.removeProperty('--ripple-duration')
}

function computePosition(clientRect: DOMRect, event: MouseEvent): IRipplePosition {
    // offsetX and offsetY can be empty if clicked by js
    if (!event.offsetX && !event.offsetY) {
        return {
            x: clientRect.width / 2,
            y: clientRect.height / 2
        };
    }
    return {
        x: event.clientX - clientRect.x,
        y: event.clientY - clientRect.y
    };
}

function renderRipple(el: HTMLElement, event: MouseEvent): void {
    const state = storage.get(el)!;
    const clientRect = el.getBoundingClientRect();
    const position = computePosition(clientRect, event);
    const computedStyles = getComputedStyle(el);

    if (computedStyles.position === 'static') {
        el.classList.add('relative');
    }

    const size = Math.max(clientRect.height, clientRect.width);
    el.style.setProperty('--ripple-size', size + 'px');
    el.style.setProperty('--ripple-x', (position.x - size / 2) + 'px');
    el.style.setProperty('--ripple-y', (position.y - size / 2) + 'px');
    el.style.setProperty('--ripple-duration', '400ms');

    requestAnimationFrame(() => {
        el.classList.add('ripple', `ripple-${state.color}`);
    })
}

function clickHandler(event: MouseEvent) {
    const el = event.currentTarget as HTMLButtonElement;
    const state = storage.get(el)!;

    if (state.activeAnimationTimeout) {
        clearTimeout(state.activeAnimationTimeout);
        completeRipple(el);
        storage.set(el, { activeAnimationTimeout: null });
    }

    requestAnimationFrame(() => {
        renderRipple(el, event);
        const timeoutId = setTimeout(() => completeRipple(el), 400);
        storage.set(el, { activeAnimationTimeout: timeoutId });
    });
}

function getColor(binding: DirectiveBinding): RippleColor {
    // ripple-slate-50
    if (binding.modifiers[RippleColor.SLATE_50]) {
        return RippleColor.SLATE_50;
    }
    // ripple-blue-800
    if (binding.modifiers[RippleColor.BLUE_800]) {
        return RippleColor.BLUE_800;
    }
    return RippleColor.SLATE_50;
}

function toggleListener(el: HTMLElement, listen: boolean): void {
    listen
        ? el.addEventListener('click', clickHandler!, { capture: true })
        : el.removeEventListener('click', clickHandler!, { capture: true });
}

export const vRipple: ObjectDirective<HTMLButtonElement> = {
    mounted(el, binding) {
        storage.set(el, { color: getColor(binding) });
        toggleListener(el, !el.disabled);
    },

    updated(el) {
        toggleListener(el, !el.disabled);
    },

    beforeUnmount(el) {
        toggleListener(el, false);
        storage.delete(el);
    }
};
