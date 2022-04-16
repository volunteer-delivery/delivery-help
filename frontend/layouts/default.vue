<template>
  <v-app>
    <v-navigation-drawer v-if="!isBottomNavigation" fixed permanent>
      <v-list nav dense>
        <v-list-item
          v-for="(item, index) of $options.navItems"
          :key="item.url"
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation fixed v-if="isBottomNavigation">
      <v-btn
        v-for="(item, index) of $options.navItems"
        :key="item.url"
        :to="item.url"
        :class="{ 'ml-2': index > 0 }"
      >
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  navItems: [
    {
      title: 'Нові',
      icon: 'mdi-car',
      url: '/'
    },
    {
      title: 'Активні',
      icon: 'mdi-play',
      url: '/active'
    }
  ],

  computed: {
    isBottomNavigation() {
      return this.$device.isMobileOrTablet;
    }
  }
}
</script>

<style>
.v-list-item--active .v-icon,
.v-btn--active .v-icon {
  color: #3F51B5 !important;
}
</style>
