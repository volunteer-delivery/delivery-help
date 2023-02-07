import {FunctionDirective} from "@vue/runtime-core";

export const vVisible: FunctionDirective<HTMLElement, boolean> = (el, { value }) => {
    el.classList.toggle('invisible', !value);
};
