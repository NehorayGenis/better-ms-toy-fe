<template>
  <form
    @submit.prevent="saveToy"
    class="toy-edit-container container flex column"
    v-if="toy"
  >
    <input type="text" v-model="toy.name" />

    <input type="number" v-model.number="toy.price" />

    <select v-model="toy.type">
      <option value="Educational">edu</option>
      <option value="Funny">funny</option>
      <option value="Adult">adult</option>
    </select>
    <label class="in-stock flex space-between align-center"
      >inStock
      <input type="checkbox" class="custom-checkbox" v-model="toy.inStock" />
    </label>
    <button :disabled="invalid || isLoading" class="btn">save</button>
    <input type="file" @change="uploadImg" />
  </form>
</template>

<script>
  import {toyService} from '@/services/toy.service.js'
  import {uploadImg} from '@/services/cloudinary.service.js'

  // import { toyService } from '@/services/toy.local.service.js'
  export default {
    name: 'toy-edit',
    data() {
      return {
        toy: null,
        isLoading: false,
      }
    },
    created() {
      var toyId = this.$route.params.id
      if (toyId) {
        this.getToyById(toyId)
      } else {
        this.toy = toyService.getEmptyToy()
      }
    },
    methods: {
      async getToyById(toyId) {
        this.toy = await this.$store.dispatch({type: 'getToyById', toyId})
      },
      async saveToy() {
        await this.$store.dispatch({type: 'saveToy', toy: this.toy})
        this.$router.push('/')
      },
      async uploadImg(ev) {
        this.isLoading = true
        const file = ev.target.files[0]
        const res = await uploadImg(file)
        this.toy.imgUrl = res.url
        this.isLoading = false
      },
    },
    components: {},
  }
</script>
