import { ObjectDirective } from 'vue';

interface IRipplePosition {
    x: number;
    y: number;
}

interface IRippleDirectiveState {
    activeAnimationTimeout: any;
}

const stateMap = new WeakMap<HTMLElement, IRippleDirectiveState>();

function completeRipple(el: HTMLElement): void {
    el.classList.remove('ripple');
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
    return { x: event.offsetX, y: event.offsetY };
}

function renderRipple(el: HTMLElement, event: MouseEvent): void {
    const clientRect = el.getBoundingClientRect();
    const position = computePosition(clientRect, event);
    const computedStyles = getComputedStyle(el);

    if (computedStyles.position === 'static') {
        el.classList.add('relative');
    }

    const size = Math.max(clientRect.height, clientRect.width) * 1.5;
    el.style.setProperty('--ripple-size', size + 'px');
    el.style.setProperty('--ripple-x', (position.x - size / 2) + 'px');
    el.style.setProperty('--ripple-y', (position.y - size / 2) + 'px');
    el.style.setProperty('--ripple-duration', '400ms')
    el.classList.add('ripple');
}

function clickHandler(event: MouseEvent) {
    const el = event.currentTarget as HTMLButtonElement;
    const state = stateMap.get(el);

    if (state?.activeAnimationTimeout) {
        clearTimeout(state.activeAnimationTimeout);
        completeRipple(el);
    }

    requestAnimationFrame(() => {
        renderRipple(el, event);
        const timeoutId = setTimeout(() => completeRipple(el), 400);
        stateMap.set(el, { activeAnimationTimeout: timeoutId });
    });
}

export const vRipple: ObjectDirective<HTMLButtonElement> = {
    mounted(el) {
        if (!el.disabled) el.addEventListener('click', clickHandler);
    },

    updated(el) {
        el.disabled
            ? el.removeEventListener('click', clickHandler!)
            : el.addEventListener('click', clickHandler!);
    },

    beforeUnmount(el) {
        el.removeEventListener('click', clickHandler!);
    }
};