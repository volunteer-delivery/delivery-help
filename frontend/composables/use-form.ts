import type {UnwrapRef} from "vue";
import type {AnySchema} from 'yup';

export interface IFormFieldDefinition<V> {
    initial: V;
    validation?: AnySchema;
}

type IFormFieldErrors = Array<string | null>;

interface IFormValidatable<E> {
    validate(): E;
    isValid: boolean;
    isInvalid: boolean;
    errors: E;
}

export interface IFormFieldModel<F> extends IFormValidatable<IFormFieldErrors> {
    data: UnwrapRef<F>;
}

export function useFormField<F>(definition: IFormFieldDefinition<F>): IFormFieldModel<F> {
    const data = ref<F>(definition.initial);
    const errors = ref<IFormFieldErrors>([]);
    const isValid = computed(() => !errors.value.length);
    const isInvalid = computed(() => !!errors.value.length);

    function validate(): IFormFieldErrors {
        if (!definition.validation) return [];

        const result = definition.validation.validateSync(data.value);
        errors.value = result.errors;
        return errors.value;
    }

    return reactive({
        data,
        errors,
        isValid,
        isInvalid,
        validate,
    });
}

type IFormFieldDefinitions<FD extends object> = {
    [FF in keyof FD]: IFormFieldDefinition<FD[FF]>;
}

type IFormFields<FD extends object> = {
    [FF in keyof FD]: IFormFieldModel<FD[FF]>;
};

type IFormErrors<FD extends object> = Partial<{
    [FF in keyof FD]: IFormFieldErrors;
}>;

export interface IFormModel<FD extends object> extends IFormValidatable<IFormErrors<FD>> {
    fields: UnwrapRef<IFormFields<FD>>;
    field<FV>(id: keyof FD): IFormFieldModel<FV>;
    data: FD;
}

function buildFormFields<FD extends object>(definition: IFormFieldDefinitions<FD>): IFormFields<FD> {
    const entries = Object.entries(definition).map(([name, definition]) => {
        return [name, useFormField(definition as IFormFieldDefinition<any>)];
    });
    return Object.fromEntries(entries);
}

export function useForm<FD extends object>(definition: IFormFieldDefinitions<FD>): IFormModel<FD> {
    const fields = buildFormFields(definition);
    const errors = ref<IFormErrors<FD>>({});
    const isValid = computed(() => !Object.keys(errors).length);
    const isInvalid = computed(() => !!Object.keys(errors).length);

    function validate(): IFormErrors<FD> {
        const result: IFormErrors<FD> = {};

        for (const id in fields) {
            result[id] = fields[id].validate();
        }

        errors.value = result;
        return errors.value;
    }

    function field<FV>(id: keyof FD): IFormFieldModel<FV> {
        const field = fields[id] as IFormFieldModel<FV>;

        if (!field) {
            throw new Error(`Unknown field with id ${id.toString()}`);
        }

        return field;
    }

    const data = computed<FD>(() => {
        const result: Partial<FD> = {};
        for (const id in fields) {
            result[id] = fields[id].data as FD[typeof id];
        }
        return result as FD;
    });

    return reactive({
        fields,
        field,
        errors,
        isValid,
        isInvalid,
        validate,
        data
    }) as IFormModel<FD>;
}
