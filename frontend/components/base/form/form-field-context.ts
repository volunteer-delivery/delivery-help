export const FORM_FIELD_PROVIDER = Symbol('FormField');

export interface IFormFieldContext {
    setValueEntered(isEntered: boolean): void;
}
