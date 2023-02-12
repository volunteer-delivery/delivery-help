<template>
    <section class="bg-white rounded-t-2xl md:rounded min-h-[33%] md:min-h-0 md:max-w-[500px] w-full">
        <header class="border-b border-r-slate-200 flex justify-between items-center py-2 pl-4 pr-2" data-modal-header>
            <h2 class="m-0 text-lg font-semibold tracking-wide">
                {{ title }}
            </h2>

            <AppButton class="md:ml-4" look="icon" size="md" @click="modal.close">
                <Icon size="24">
                    <CloseRound />
                </Icon>
            </AppButton>
        </header>

        <main class="px-4 pt-2 pb-4">
            <slot />
        </main>
    </section>
</template>

<script lang="ts" setup>
import {Icon} from "@vicons/utils";
import {CloseRound} from '@vicons/material';

defineProps({
    title: {
        type: String,
        required: true
    }
});

const modal = useActiveModal();
</script>
