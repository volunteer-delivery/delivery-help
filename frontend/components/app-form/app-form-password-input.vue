<template>
    <AppFormTextInput :type="type">
        <template #append>
            <AppButton type="icon" size="sm" @click.stop.prevent="toggleInsecure">
                <Icon class="text-gray-600" size="24">
                    <component :is="icon" />
                </Icon>
            </AppButton>
        </template>
    </AppFormTextInput>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils'
import { RemoveRedEyeOutlined, RemoveRedEyeSharp } from '@vicons/material';

const isInsecure = ref(false);
const type = computed(() => isInsecure.value ? 'text' : 'password');
const icon = computed(() => isInsecure.value ? RemoveRedEyeOutlined : RemoveRedEyeSharp);

const toggleInsecure = () => isInsecure.value = !isInsecure.value;
</script>
