import type {Component} from "vue";
import {defineStore} from "pinia";

type ModalCloseById = (id: string) => void;

interface IModalOptions {
    content: Component;
    closeById: ModalCloseById;
}

const uniqueId = useUniqueId('modal');

export class Modal {
    public readonly id: string;
    public readonly content: Component;
    private readonly closeById: ModalCloseById;

    constructor(options: IModalOptions) {
        this.id = uniqueId.next();
        this.content = options.content;
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

    function open(content: Component) {
        const modal = new Modal({
            content: markRaw(content),
            closeById
        });
        list.value.push(modal);
        return modal;
    }

    return { list, open };
});
