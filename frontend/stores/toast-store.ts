import {defineStore} from "pinia";

type ToastCloseById = (id: number) => void;

interface IToastOptions {
    id: number;
    message: string;
    closeById: ToastCloseById;
}

export class Toast {
    public readonly id: number;
    public readonly message: string;
    private readonly closeById: ToastCloseById;
    private closingTimeout: any;

    constructor(options: IToastOptions) {
        this.id = options.id;
        this.message = options.message;
        this.closeById = options.closeById;
    }

    close(): void {
        this.closeById(this.id);
        clearTimeout(this.closingTimeout);
    }

    closeAfter(timeout: number = 5000): void {
        this.closingTimeout = setTimeout(() => this.close(), timeout);
    }
}

export const useToastStore = defineStore('toast', () => {
    let toastLastId = 0;
    const list = ref<Toast[]>([]);

    function close(id: number) {
        list.value = list.value.filter((toast) => toast.id !== id);
    }

    function open(message: string): Toast {
        const id = toastLastId++;
        const toast = new Toast({
            id,
            message,
            closeById: close
        });
        list.value = list.value.concat(toast);
        return toast;
    }

    return { open, list };
});
