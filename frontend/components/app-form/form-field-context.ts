import type {IFormFieldModel} from "~/composables/use-form";

export const FORM_FIELD_PROVIDER = Symbol('FormFieldModel');

export type CheckValueEntered<V> = (value: V) => boolean;

export interface IFormFieldContext<V> {
    registerValueEntered(isValueEntered: CheckValueEntered<V>): void;
    model: IFormFieldModel<V>;
}
