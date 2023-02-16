<template>
    <AppFormTextInput :type="type" :autocomplete="false" :autocapitalize="false">
        <template #append>
            <AppButton
                look="icon"
                size="sm"
                :disabled="model.isDisabled"
                @click.stop.prevent="toggleInsecure"
            >
                <Icon size="24">
                    <component :is="icon" />
                </Icon>
            </AppButton>
        </template>
    </AppFormTextInput>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils';
import { RemoveRedEyeOutlined, RemoveRedEyeSharp } from '@vicons/material';
import { InjectionToken } from '~/enums';
import { IFormFieldModel } from '~/composables/use-form';

const model = inject<IFormFieldModel<string>>(InjectionToken.FORM_FIELD)!;

const insecure = ref(false);
const isInsecure = computed(() => insecure.value && !model.isDisabled);
const type = computed(() => isInsecure.value ? 'text' : 'password');
const icon = computed(() => isInsecure.value ? RemoveRedEyeOutlined : RemoveRedEyeSharp);

const toggleInsecure = (): void => void (insecure.value = !insecure.value);
</script>
