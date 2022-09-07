<template>
  <header class="header-container">
    <section class="main-app-header flex space-between align-center container">
      <div @click="goHome" class="logo flex align-end">
        <div class="logo-img">
          <img src="../assets/imgs/02_rubber_duck.png" alt="Rubber Duck" />
        </div>
        <h1>Toys</h1>
      </div>
      <div class="nav-bar-container">
        <router-link to="/" class="nav-bar-link">Home</router-link>
        <router-link to="/review" class="nav-bar-link">Reviews</router-link>
        <router-link v-if="!user" to="/login" class="nav-bar-link"
          >Login</router-link
        >
        <template v-else>
          <router-link to="/User" class="nav-bar-link">User</router-link>
          <button @click="logout" class="nav-bar-link">Logout</button>
        </template>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: "app-header",
  methods: {
    goHome() {
      this.$router.push("/")
    },
    logout() {
      this.$store.dispatch("logout")
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
}
</script>
