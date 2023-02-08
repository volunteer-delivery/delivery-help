<template>
    <p class="px-5 py-2 md:px-7 md:py-3 m-0 bg-gray-900 border-b border-b-gray-600 text-white text-sm md:text-md shadow-md" @click="close">
        {{ toast.message }}
    </p>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import {Toast} from "~/stores/toast-store";

const props = defineProps({
    toast: {
        type: Object as PropType<Toast>,
        required: true
    }
})

const close = () => props.toast.close();
</script>
