<template>
  <div id="app" class="main-layout flex column">
    <app-header />
    <router-view class="flex column grow-1" />
    <footer class="main-app-footer flex center-center">
      <h5>copyright</h5>
    </footer>
  </div>
</template>

<script>
  import appHeader from './cmps/app-header.vue'
  import {socketService} from './services/socket.service'

  export default {
    created() {
      this.$store.dispatch('loadToys')
      socketService.on('something-changed', this.alertSomethingChanged)
    },
    methods: {
      alertSomethingChanged() {
        alert('Admin has updated the store...')
      },
    },
    components: {
      appHeader,
    },
  }
</script>
