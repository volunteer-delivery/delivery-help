<template>
  <v-row justify="center" align="center">
    <v-col class="pt-7" cols="12" sm="8" md="6">
      <Drive
        class="mb-4"
        v-for="drive of drives"
        :key="drive.id"
        :drive="drive"
      />
    </v-col>
  </v-row>
</template>

<script>
import Drive from "~/components/drives/drive";
import DrivesFilter from "~/components/drives/drives-filter";
import DriverFilterMobileTrigger from "~/components/drives/drives-filter-mobile-trigger";

export default {
  components: { Drive },

  async asyncData({ store }) {
    await store.dispatch('drives-store/load')
  },

  computed: {
    drives() {
      return this.$store.getters['drives-store/pendingFilteredSorted']
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
