<template>
  <section class="toy-app-container container">
    <toy-filter />
    <toy-list v-if="toys" :toys="toys" />
  </section>
</template>

<script>
  import toyList from '@/cmps/toy-list.vue'
  import toyFilter from '@/cmps/toy-filter.vue'
  import {socketService} from '../services/socket.service.js'

  export default {
    created() {
      socketService.on('delete-toy', this.deleteToy)
    },
    methods: {
      deleteToy(toyId) {
        console.log('removing toy')
        this.$store.commit({type: 'removeToy', toyId})
      },
    },
    computed: {
      toys() {
        return this.$store.getters.getToys
      },
    },
    components: {
      toyList,
      toyFilter,
    },
  }
</script>
