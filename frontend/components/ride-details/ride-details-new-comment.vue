<template>
    <AppForm class="flex items-end" :model="form" @submit="send">
        <AppFormField class="grow" id="text" label="Додати Коментар">
            <AppFormTextarea />
        </AppFormField>

        <AppButton
            class="ml-2 -mb-1 -rotate-[135deg]"
            look="icon"
            size="md"
            type="submit"
        >
            <Icon size="24">
                <SendRound />
            </Icon>
        </AppButton>
    </AppForm>
</template>

<script lang="ts" setup>
import { Icon } from '@vicons/utils';
import SendRound from '@vicons/material/SendRound';

interface ICommentForm {
    text: string;
}

const rideDetailsStore = useRideDetailsStore();

const form = useForm<ICommentForm>({
    text: {
        initial: '',
    },
});

function send(): void {
    const message = form.data.text.trim();

    if (message) {
        rideDetailsStore.sendComment(message);
        form.data.text = '';
    }
}
</script>
