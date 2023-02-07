<template>
    <AppFormTextInput :type="type">
        <template #append v-if="!model.isDisabled">
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
import {InjectionToken} from "~/enums";
import {IFormFieldModel} from "~/composables/use-form";

const model = inject<IFormFieldModel<string>>(InjectionToken.FORM_FIELD)!;

const insecure = ref(false);
const isInsecure = computed(() => insecure.value && !model.isDisabled);
const type = computed(() => isInsecure.value ? 'text' : 'password');
const icon = computed(() => isInsecure.value ? RemoveRedEyeOutlined : RemoveRedEyeSharp);

const toggleInsecure = () => insecure.value = !insecure.value;
</script>
