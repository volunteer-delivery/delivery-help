<template>
  <v-row class="h-100" justify="center" align="center">
    <v-col class="pt-5 h-100 d-flex flex-column justify-center" cols="12" sm="8" md="4">
      <v-card elevation="1">
        <v-card-title>
          DeliveryHelp ~ Вхід
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Користувач"
            v-model="credentials.username"
          />

          <v-text-field
            label="Пароль"
            type="password"
            v-model="credentials.password"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer/>

          <v-btn color="primary">
            Увійти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'sign-in',
  layout: 'auth',

  meta: {
    auth: 'public'
  },

  data: () => ({
    credentials: {
      username: '',
      password: ''
    }
  })
}
</script>
