<template>
    <AppFormTextInput>
        <template #append>
            <component :is="icon" />
        </template>
    </AppFormTextInput>
</template>

<script setup>
import { RemoveRedEyeOutlined, RemoveRedEyeSharp } from '@vicons/material';

const isInsecure = ref(false);
const type = computed(() => isInsecure.value ? 'text' : 'password');
const icon = computed(() => isInsecure.value ? RemoveRedEyeOutlined : RemoveRedEyeSharp);

const toggleInsecure = () => isInsecure.value = !isInsecure.value;
</script>
