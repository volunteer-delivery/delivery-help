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

export default {
  name: "running",

  components: {
    Drive
  },

  async asyncData({ store }) {
    await store.dispatch('drives-store/load')
  },

  computed: {
    drives() {
      return this.$store.getters["drives-store/active"]
    }
  }
}
</script>
