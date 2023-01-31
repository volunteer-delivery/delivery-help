<template>
    <v-row class="h-100" justify="center" align="center">
        <v-col class="pt-5 h-100 d-flex flex-column justify-center" cols="12" sm="8" md="6" lg="4">
            <v-form class="sign-in__form" lazy-validation ref="formRef" @submit="signIn">
                <v-card class="sign-in__card" elevation="1">
                    <v-card-title>
                        ВолонтерВантаж ~ Вхід
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            label="Користувач"
                            autocapitalize="off"
                            v-model="credentials.username"
                            :rules="validations.username"
                        />

                        <password-field
                            label="Пароль"
                            v-model="credentials.password"
                            :rules="validations.password"
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer/>

                        <v-btn class="sign-in__button" color="primary" type="submit" :loading="isSubmitting">
                            Увійти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>

<script setup>
import { requireField } from '~/validations';
import { PasswordField } from "~/components/form";
import { useAuthStore } from "~/store/auth-store";
import {useToast} from "vue-toast-notification";

definePageMeta({
    layout: 'auth',
    meta: {
        auth: 'public'
    }
});

const validations = {
    username: [requireField()],
    password: [requireField()]
};

const toast = useToast();
const authStore = useAuthStore();

const formRef = ref(null);
const isSubmitting = ref(false);

const credentials = reactive({
    username: '',
    password: ''
});

async function signIn(event) {
    event.preventDefault();
    if (!formRef.value.validate()) return;

    try {
        isSubmitting.value = true;
        await authStore.signIn(credentials);
        await navigateTo('/');
    } catch (error) {
        toast.default(error.message)
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<style>
.sign-in__button {
    width: 40%;
}

@media (max-width: 599px) {
    .sign-in__form {
        height: 66%;
    }

    .sign-in__card.sign-in__card.sign-in__card {
        box-shadow: none !important;
    }
}
</style>
