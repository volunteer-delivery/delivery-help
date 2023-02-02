import {IFormModel} from "~/composables/use-form";

export const FORM_PROVIDER = Symbol('FormModel');

export interface IFormContext<V extends object> {
    model: IFormModel<V>;
}
