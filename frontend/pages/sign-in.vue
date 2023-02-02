<template>
    <div class="h-full p-4 flex items-center justify-center">
        <div class="h-3/4 md:h-auto w-full md:max-w-sm">
            <AppCard class="shadow-none md:shadow-md">
                <AppCardTitle>
                    ВолонтерВантаж ~ Вхід
                </AppCardTitle>
                <AppForm :model="form">
                    <AppCardBody>
                        <AppFormField id="username" label="Користувач" class="mb-4">
                            <AppFormTextInput />
                        </AppFormField>
                        <AppFormField id="password" label="Пароль">
                            <AppFormPasswordInput />
                        </AppFormField>
                    </AppCardBody>
                </AppForm>
            </AppCard>
        </div>
    </div>

<!--    <v-row class="h-100" justify="center" align="center">-->
<!--        <v-col class="pt-5 h-100 d-flex flex-column justify-center" cols="12" sm="8" md="6" lg="4">-->
<!--            <v-form class="sign-in__form" lazy-validation ref="formRef" @submit="signIn">-->
<!--                <v-card class="sign-in__card" elevation="1">-->
<!--                    <v-card-title>-->
<!--                        ВолонтерВантаж ~ Вхід-->
<!--                    </v-card-title>-->

<!--                    <v-card-text>-->
<!--                        <v-text-field-->
<!--                            label="Користувач"-->
<!--                            autocapitalize="off"-->
<!--                            v-model="credentials.username"-->
<!--                            :rules="validations.username"-->
<!--                        />-->

<!--                        <password-field-->
<!--                            label="Пароль"-->
<!--                            v-model="credentials.password"-->
<!--                            :rules="validations.password"-->
<!--                        />-->
<!--                    </v-card-text>-->

<!--                    <v-card-actions>-->
<!--                        <v-spacer/>-->

<!--                        <v-btn class="sign-in__button" color="primary" type="submit" :loading="isSubmitting">-->
<!--                            Увійти-->
<!--                        </v-btn>-->
<!--                    </v-card-actions>-->
<!--                </v-card>-->
<!--            </v-form>-->
<!--        </v-col>-->
<!--    </v-row>-->
</template>

<script lang="ts" setup>
import type {ICredentials} from "~/stores/auth-store";
import { string as requireString } from 'yup';
// import {useToast} from "vue-toast-notification";

definePageMeta({
    layout: 'auth'
});

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

// const toast = useToast();
// const authStore = useAuthStore();
//
// const formRef = ref(null);
// const isSubmitting = ref(false);
//
// async function signIn(event) {
//     event.preventDefault();
//     if (!formRef.value.validate()) return;
//
//     try {
//         isSubmitting.value = true;
//         await authStore.signIn(credentials);
//         await navigateTo('/');
//     } catch (error) {
//         toast.default(error.message)
//     } finally {
//         isSubmitting.value = false;
//     }
// }
</script>

<!--<style>-->
<!--.sign-in__button {-->
<!--    width: 40%;-->
<!--}-->

<!--@media (max-width: 599px) {-->
<!--    .sign-in__form {-->
<!--        height: 66%;-->
<!--    }-->

<!--    .sign-in__card.sign-in__card.sign-in__card {-->
<!--        box-shadow: none !important;-->
<!--    }-->
<!--}-->
<!--</style>-->
