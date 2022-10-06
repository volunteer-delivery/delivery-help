<template>
    <v-text-field
        autocapitalize="off"
        :type="type"
        :label="label"
        :value="value"
        :rules="rules"
        @input="$emit('input', $event)"
    >
        <template #append>
            <v-btn small icon @click="toggleInsecure">
                <v-icon>{{ icon }}</v-icon>
            </v-btn>
        </template>
    </v-text-field>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js';

export default {
    name: "password-field",

    props: {
        value: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: false,
            default: 'Пароль'
        },
        rules: {
            type: Array,
            required: false,
            default: () => []
        }
    },

    data: () => ({
        isInsecure: false
    }),

    computed: {
        type() {
            return this.isInsecure ? 'text' : 'password';
        },

        icon() {
            return this.isInsecure ? mdiEyeOff : mdiEye;
        }
    },

    methods: {
        toggleInsecure() {
            this.isInsecure = !this.isInsecure;
        }
    }
}
</script>

