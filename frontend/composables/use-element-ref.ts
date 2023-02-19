import { ComponentPublicInstance, Ref } from 'vue';

type MaybeElementRef = Ref<ComponentPublicInstance | HTMLElement | null>;

function isComponent(ref: MaybeElementRef): ref is Ref<ComponentPublicInstance | null> {
    return !!(ref.value as ComponentPublicInstance)?.$el;
}

export function useElementRef(ref: MaybeElementRef): Ref<HTMLElement | null> {
    return computed(() => {
        if (!ref.value) return null;
        if (isComponent(ref)) {
            const el = ref.value.$el;
            return el.nodeType === Node.COMMENT_NODE ? null : el;
        }
        return ref.value;
    });
}
