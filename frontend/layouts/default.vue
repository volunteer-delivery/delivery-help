<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation fixed>
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
  ]
}
</script>
