<template>
    <FormTextInput
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue')"
    >
        <template #append>
            <component :is="icon" />
        </template>
    </FormTextInput>
</template>

<script setup>
import { RemoveRedEyeOutlined, RemoveRedEyeSharp } from '@vicons/material';
import FormTextInput from './form-text-input';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const isInsecure = ref(false);
const type = computed(() => isInsecure.value ? 'text' : 'password');
const icon = computed(() => isInsecure.value ? RemoveRedEyeOutlined : RemoveRedEyeSharp);

const toggleInsecure = () => isInsecure.value = !isInsecure.value;
</script>
