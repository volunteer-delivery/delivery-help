<template>
    <div>
        <v-btn class="mb-3" text tile elevation="0" @click="$router.back()">
            <v-icon class="mr-3">
                {{ $options.icons.mdiArrowLeft }}
            </v-icon>

            Назад
        </v-btn>
    </div>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js';

export default {
    name: 'id',

    icons: {
        mdiArrowLeft
    },

    computed: {
        canGoBack() {
            return this.$router;
        }
    }
};
</script>

<style scoped>

</style>
