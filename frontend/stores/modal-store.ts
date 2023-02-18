import type { Component } from 'vue';
import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

type ModalCloseById = (id: string) => void;
type ContentProps = Record<string, unknown>;

interface IModalOpenOptions<P extends ContentProps> {
    props: P;
}

interface IModalOptions extends IModalOpenOptions<ContentProps> {
    content: Component;
    closeById: ModalCloseById;
}

export class Modal {
    public readonly id: string;
    public readonly content: Component;
    public readonly props: ContentProps;
    private readonly closeById: ModalCloseById;

    constructor(options: IModalOptions) {
        this.id = nanoid();
        this.content = options.content;
        this.props = options.props;
        this.closeById = options.closeById;
        this.close = this.close.bind(this);
    }

    public close(): void {
        this.closeById(this.id);
    }
}

export const useModalStore = defineStore('modal', () => {
    const list = ref<Modal[]>([]);

    const closeById: ModalCloseById = (id: string) => {
        list.value = list.value.filter((modal) => modal.id !== id);
    };

    function open<P extends ContentProps>(content: Component, options: Partial<IModalOpenOptions<P>> = {}): Modal {
        const modal = new Modal({
            content: markRaw(content),
            closeById,
            props: options.props || {},
        });
        list.value.push(modal);
        return modal;
    }

    return { list, open };
});
