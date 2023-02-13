<template>
    <AppForm :model="form" :disabled="isSubmitting" @submit="signIn">
        <AppCardBody>
            <AppFormField id="username" label="Користувач" class="mb-4">
                <AppFormTextInput :autocapitalize="false" />
            </AppFormField>
            <AppFormField id="password" label="Пароль">
                <AppFormPasswordInput />
            </AppFormField>
        </AppCardBody>
        <AppCardActions>
            <AppButton
                class="ml-auto w-2/5"
                type="submit"
                look="primary"
                size="md"
                :loading="isSubmitting"
            >
                УВІЙТИ
            </AppButton>
        </AppCardActions>
    </AppForm>
</template>

<script lang="ts" setup>
import {string as requireString} from "yup";
import {ICredentials} from "~/stores/auth-store";

const form = useForm<ICredentials>({
    username: {
        initial: '',
        validation: requireString().required()
    },
    password: {
        initial: '',
        validation: requireString().required()
    }
});

const toastStore = useToastStore();
const authStore = useAuthStore();

const isSubmitting = ref(false);

async function signIn(): Promise<void> {
    await form.validate();
    if (form.isInvalid) return;

    try {
        isSubmitting.value = true;
        await authStore.signIn(form.data)
        await navigateTo('/');
        isSubmitting.value = false;
    } catch (error) {
        toastStore.open((error as Error).message).closeAfter();
        await wait(200);
        isSubmitting.value = false;
    }
}
</script>
