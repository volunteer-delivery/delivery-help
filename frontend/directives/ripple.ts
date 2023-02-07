import { ObjectDirective } from 'vue';

interface RippleDirective extends ObjectDirective<HTMLButtonElement> {
    _clickHandler?(event: MouseEvent): void;
    _activeAnimationTimeout?: any;
}

export const vRipple: RippleDirective = {
    mounted(el, binding) {
        const self = (binding.dir as RippleDirective);

        self._clickHandler = (event: MouseEvent) => {
            const el = event.currentTarget as HTMLButtonElement;

            function complete() {
                el.classList.remove('ripple');
                el.style.removeProperty('--ripple-size');
                el.style.removeProperty('--ripple-x');
                el.style.removeProperty('--ripple-y');
                el.style.removeProperty('--ripple-duration')
            }

            if (self._activeAnimationTimeout) {
                clearTimeout(self._activeAnimationTimeout);
                complete();
            }

            requestAnimationFrame(() => {
                const clientRect = el.getBoundingClientRect();
                const computedStyles = getComputedStyle(el);

                if (computedStyles.position === 'static') {
                    el.classList.add('relative');
                }

                const size = Math.max(clientRect.height, clientRect.width) * 1.5;
                el.style.setProperty('--ripple-size', size + 'px');
                el.style.setProperty('--ripple-x', (event.offsetX - size / 2) + 'px');
                el.style.setProperty('--ripple-y', (event.offsetY - size / 2) + 'px');
                el.style.setProperty('--ripple-duration', '400ms')
                el.classList.add('ripple');

                self._activeAnimationTimeout = setTimeout(complete, 400);
            });
        }

        if (!el.disabled) {
            el.addEventListener('click', self._clickHandler);
        }
    },

    updated(el, binding) {
        const self = binding as RippleDirective;

        el.disabled
            ? el.removeEventListener('click', self._clickHandler!)
            : el.addEventListener('click', self._clickHandler!);
    },

    beforeUnmount(el, binding) {
        const self = (binding.dir as RippleDirective);
        el.removeEventListener('click', self._clickHandler!);
    }
};
