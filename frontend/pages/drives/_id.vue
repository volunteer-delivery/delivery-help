<template>
    <div>
        <v-btn class="mt-n3" text tile elevation="0" @click="$router.back()">
            <v-icon class="mr-3">
                {{ $options.icons.mdiArrowLeft }}
            </v-icon>

            Назад
        </v-btn>

        <drive :drive="drive" hide-actions />
    </div>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js';
import Drive from '@/components/drives/drive';

export default {
    name: 'id',
    components: { Drive },
    icons: {
        mdiArrowLeft
    },

    computed: {
        canGoBack() {
            return this.$router;
        },

        drive() {
            const id = this.$route.params.id;
            const drives = this.$store.state['drives-store'].drives;
            return drives.find(drive => drive.id === id);
        }
    }
};
</script>

<style scoped>

</style>
