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

<script setup>
import { mdiEye, mdiEyeOff } from '@mdi/js';

const props = defineProps({
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
});

defineEmits(['input']);

const isInsecure = ref(false);
const type = computed(() => isInsecure.value ? 'text' : 'password');
const icon = computed(() => isInsecure.value ? mdiEyeOff : mdiEye);

const toggleInsecure = () => isInsecure.value = !isInsecure.value;
</script>

