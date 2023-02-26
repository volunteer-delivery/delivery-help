import type { ComponentPublicInstance, Ref } from 'vue';

export type ElementRefValue = HTMLElement | null;
export type MaybeElementRefValue = ComponentPublicInstance | ElementRefValue;
export type MaybeElementRef = Ref<MaybeElementRefValue>;
export type ElementRef = Ref<ElementRefValue>;

function isComponent(ref: MaybeElementRef): ref is Ref<ComponentPublicInstance | null> {
    return !!(ref.value as ComponentPublicInstance)?.$el;
}

export function useElementRef(ref: MaybeElementRef): ElementRef {
    return computed(() => {
        if (!ref.value) return null;
        if (isComponent(ref)) {
            const el = ref.value.$el;
            return el.nodeType === Node.COMMENT_NODE ? null : el;
        }
        return ref.value;
    });
}
