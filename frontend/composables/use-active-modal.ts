import { Modal } from '~/stores/modal-store';

export const ACTIVE_MODAL = Symbol('activeModal');

export function useActiveModal(): Modal {
    return inject(ACTIVE_MODAL)!;
}
