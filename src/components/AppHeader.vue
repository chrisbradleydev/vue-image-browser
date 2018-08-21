<template>
  <div class="ui secondary pointing menu">
    <router-link to="/" class="active item">
      {{ appTitle }}
    </router-link>
    <div class="right menu">
      <div v-if="isLoggedIn" class="horizontal">
        <router-link to="/" class="item">Gallery</router-link>
        <router-link to="/upload" class="item">Upload</router-link>
        <a class="item" @click="logout">Logout</a>
      </div>
      <a v-else class="item" @click="login(clientId)">
        Login
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AppHeader',
  computed: {
    appTitle() {
      return process.env.VUE_APP_TITLE
    },
    clientId() {
      return process.env.VUE_APP_IMGUR_CLIENT_ID
    },
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      logout: 'auth/logout',
    }),
  },
}
</script>

<style scoped>
.horizontal {
  display: flex;
  flex-direction: row;
}
</style>
