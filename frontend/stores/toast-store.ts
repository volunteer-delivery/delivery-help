import {defineStore} from "pinia";

type ToastCloseById = (id: string) => void;

interface IToastOptions {
    message: string;
    closeById: ToastCloseById;
}

const uniqueId = useUniqueId('toast');

export class Toast {
    public readonly id: string;
    public readonly message: string;
    private readonly closeById: ToastCloseById;
    private closingTimeout: any;

    constructor(options: IToastOptions) {
        this.id = uniqueId.next();
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
    const list = ref<Toast[]>([]);

    const close: ToastCloseById = (id: string) => {
        list.value = list.value.filter((toast) => toast.id !== id);
    };

    function open(message: string): Toast {
        const toast = new Toast({
            message,
            closeById: close
        });
        list.value = list.value.concat(toast);
        return toast;
    }

    return { open, list };
});
