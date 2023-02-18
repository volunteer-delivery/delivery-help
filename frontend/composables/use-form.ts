import type { Ref, UnwrapRef } from 'vue';
import { AnySchema, ValidationError } from 'yup';

export interface IFormAutocompleteOption {
    id: string | number;
    value: string;
    title?: string;
}

export interface IFormFieldDefinition<V> {
    initial: V;
    validation?: AnySchema;
}

type IFormFieldErrors = Array<string>;

interface IFormValidatable<E> {
    validate(): Promise<E>;
    isValid: boolean;
    isInvalid: boolean;
    errors: E;
}

export type CheckValueEntered<V> = (value: V) => boolean;

export interface IFormFieldModel<F> extends IFormValidatable<IFormFieldErrors> {
    data: UnwrapRef<F>;
    isEntered: boolean;
    isDisabled: boolean;
    registerEnteredCheck(check: CheckValueEntered<F>): void;
    setDisabled(toDisabled: boolean): void;
}

export function useFormField<F>(definition: IFormFieldDefinition<F>): IFormFieldModel<F> {
    const data = ref<F>(definition.initial);
    const errors = ref<IFormFieldErrors>([]);
    const isValid = computed(() => !errors.value.length);
    const isInvalid = computed(() => !!errors.value.length);
    const isDisabled = ref(false);
    const isEntered = ref(false);
    let checkEntered: CheckValueEntered<F>;

    async function validate(): Promise<IFormFieldErrors> {
        if (!definition.validation) return [];

        return definition.validation.validate(data.value)
            .then(() => {
                errors.value = [];
                return errors.value;
            })
            .catch((validation: unknown) => {
                if (ValidationError.isError(validation)) {
                    errors.value = validation.errors;
                    return errors.value;
                }
                throw validation;
            });
    }

    function registerEnteredCheck(check: CheckValueEntered<F>): void {
        checkEntered = check;
        isEntered.value = check(data.value as F);
    }

    watch(data, () => {
        if (definition.validation && isInvalid.value) {
            validate();
        }

        if (checkEntered) {
            isEntered.value = checkEntered(data.value as F);
        }
    });

    function setDisabled(toDisabled: boolean): void {
        isDisabled.value = toDisabled;
    }

    return reactive({
        data,
        errors,
        isValid,
        isInvalid,
        validate,
        isDisabled,
        setDisabled,
        isEntered,
        registerEnteredCheck,
    });
}

type IFormFieldDefinitions<FD extends object> = {
    [FF in keyof FD]: IFormFieldDefinition<FD[FF]>;
};

type IFormFields<FD extends object> = {
    [FF in keyof FD]: IFormFieldModel<FD[FF]>;
};

type IFormErrors<FD extends object> = Partial<{
    [FF in keyof FD]: IFormFieldErrors;
}>;

export interface IFormModel<FD extends object> extends IFormValidatable<IFormErrors<FD>> {
    fields: UnwrapRef<IFormFields<FD>>;
    data: FD;
    field<FV>(id: keyof FD): IFormFieldModel<FV>;
    setDisabled(toDisabled: boolean): void;
}

function buildFormFields<FD extends object>(definition: IFormFieldDefinitions<FD>): IFormFields<FD> {
    const entries = Object.entries(definition).map(([name, definition]) => {
        return [name, useFormField(definition as IFormFieldDefinition<unknown>)];
    });
    return Object.fromEntries(entries);
}

function buildFormData<FD extends object>(fields: IFormFields<FD>): FD {
    const result: Partial<Record<keyof FD, Ref<unknown>>> = {};

    for (const id in fields) {
        result[id] = computed({
            get: () => fields[id].data as FD[typeof id],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set: (value) => void (fields[id].data = value as any),
        });
    }

    return reactive(result) as FD;
}

export function useForm<FD extends object>(definition: IFormFieldDefinitions<FD>): IFormModel<FD> {
    const fields = buildFormFields(definition);
    const errors = ref<IFormErrors<FD>>({});
    const data = buildFormData<FD>(fields);
    const isValid = computed(() => !Object.keys(errors.value).length);
    const isInvalid = computed(() => !isValid.value);

    async function validate(): Promise<IFormErrors<FD>> {
        const result: IFormErrors<FD> = {};

        for (const id in fields) {
            const errors = await fields[id].validate();
            if (errors.length) result[id] = errors;
        }

        errors.value = result;
        await nextTick();
        return errors.value;
    }

    function field<FV>(id: keyof FD): IFormFieldModel<FV> {
        const field = fields[id] as IFormFieldModel<FV>;

        if (!field) {
            throw new Error(`Unknown field with id ${id.toString()}`);
        }

        return field;
    }

    function setDisabled(toDisabled: boolean): void {
        for (const id in fields) {
            fields[id].setDisabled(toDisabled);
        }
    }

    return reactive({
        fields,
        field,
        errors,
        isValid,
        isInvalid,
        validate,
        data,
        setDisabled,
    }) as IFormModel<FD>;
}
