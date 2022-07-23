<template>
    <DriveList :drives="drives" />
</template>

<script>
import DriveList from '~/components/drives/drive-list';

export default {
    name: 'done',

    components: {
        DriveList
    },

    computed: {
        drives() {
            return this.$store.getters['drives-store/done'];
        }
    }
};
</script>
