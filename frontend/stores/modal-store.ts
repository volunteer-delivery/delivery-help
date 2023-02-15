import type {Component} from "vue";
import {defineStore} from "pinia";

type ModalCloseById = (id: string) => void;

interface IModalOpenOptions<P extends Record<string, any>> {
    props: P;
}

interface IModalOptions extends IModalOpenOptions<Record<string, any>> {
    content: Component;
    closeById: ModalCloseById;
}

const uniqueId = useUniqueId('modal');

export class Modal {
    public readonly id: string;
    public readonly content: Component;
    public readonly props: Record<string, any>;
    private readonly closeById: ModalCloseById;

    constructor(options: IModalOptions) {
        this.id = uniqueId.next();
        this.content = options.content;
        this.props = options.props;
        this.closeById = options.closeById;
        this.close = this.close.bind(this);
    }

    close(): void {
        this.closeById(this.id);
    }
}

export const useModalStore = defineStore('modal', () => {
    const list = ref<Modal[]>([]);

    const closeById: ModalCloseById = (id: string) => {
        list.value = list.value.filter(modal => modal.id !== id);
    };

    function open<P extends Record<string, any>>(content: Component, options: Partial<IModalOpenOptions<P>> = {}) {
        const modal = new Modal({
            content: markRaw(content),
            closeById,
            props: options.props || {}
        });
        list.value.push(modal);
        return modal;
    }

    return { list, open };
});
