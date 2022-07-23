<template>
    <DriveList :drives="drives" />
</template>

<script>
import DrivesFilter from '~/components/drives/drives-filter';
import DriverFilterMobileTrigger from '~/components/drives/drives-filter-mobile-trigger';
import DriveList from '@/components/drives/drive-list';

export default {
    components: { DriveList },

    computed: {
        drives() {
            return this.$store.getters['drives-store/pendingFilteredSorted'];
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.commit('navigation-store/setExtra', {
                view: DrivesFilter,
                mobileTrigger: DriverFilterMobileTrigger
            });
        });
    },

    beforeRouteLeave(to, from, next) {
        this.$store.commit('navigation-store/setExtra', null);
        next();
    }
};
</script>
