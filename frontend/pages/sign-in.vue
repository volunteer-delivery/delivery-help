<template>
    <v-row class="h-100" justify="center" align="center">
        <v-col class="pt-5 h-100 d-flex flex-column justify-center" cols="12" sm="8" md="4">
            <v-form lazy-validation ref="form" @submit="signIn">
                <v-card elevation="1">
                    <v-card-title>
                        DeliveryHelp ~ Вхід
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            label="Користувач"
                            v-model="credentials.username"
                            :rules="$options.validations.username"
                        />

                        <v-text-field
                            label="Пароль"
                            type="password"
                            v-model="credentials.password"
                            :rules="$options.validations.password"
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer/>

                        <v-btn color="primary" type="submit" :loading="isSubmitting">
                            Увійти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
import { requireField } from '~/validations/require-field';

export default {
    name: 'sign-in',
    layout: 'auth',

    meta: {
        auth: 'public'
    },

    validations: {
        username: [requireField()],
        password: [requireField()]
    },

    data: () => ({
        isSubmitting: false,
        credentials: {
            username: '',
            password: ''
        }
    }),

    methods: {
        async signIn(event) {
            event.preventDefault();
            if (!this.$refs.form.validate()) return;

            try {
                this.isSubmitting = true;
                await this.$store.dispatch('auth-store/signIn', this.credentials);
                await this.$router.push('/');
            } catch (error) {
                this.$toast.show(error.message);
            } finally {
                this.isSubmitting = false;
            }
        }
    }
};
</script>
