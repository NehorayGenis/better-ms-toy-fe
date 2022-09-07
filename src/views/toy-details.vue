<template>
  <div class="toy-detailes-container container" v-if="toy">
    <div class="toy-details flex align-center">
      <div class="toy-info">
        <h2>{{ toy.name }}</h2>
        <h3>Price: ${{ toy.price }}</h3>
        <h3>Type: {{ toy.type }}</h3>
        <h3>{{ toyInStock }}</h3>
        <h4>The toy was created at: {{ date }}</h4>
      </div>
      <div class="img-container">
        <img v-if="toy.imgUrl" :src="toy.imgUrl" alt="toy-img" />
        <img
          v-else
          src="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
          alt="image placeholder"
        />
      </div>
    </div>
    <div class="review-container">
      <div class="review-add flex">
        <input type="text" v-model="review" placeholder="Write your review" />
        <button @click="addReview" class="btn">Save</button>
      </div>
      <details v-if="reviews" class="review-list">
        <summary>Reviews</summary>
        <div v-for="review in reviews" :key="review._id" class="review-preview">
          <h4>By {{ review.user.username }}</h4>
          <p>{{ review.content }}</p>
        </div>
      </details>
    </div>
    <chat-room
      @close="toggleChat"
      v-if="isChat"
      :msgHistory="toy.msgs || []"
      :toyId="toy._id"
    />
    <img
      v-else
      @click="toggleChat"
      class="chat-icon"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJxJOgpS0rGQ1jVDxik31OfgfHsX15C_sivQ&usqp=CAU"
      alt="chat icon"
    />
  </div>
</template>

<script>
  import chatRoom from '../cmps/chat-room.vue'

  export default {
    data() {
      return {
        toy: null,
        review: '',
        isChat: false,
      }
    },
    components: {
      chatRoom,
    },
    computed: {
      toyInStock() {
        return this.toy.inStock
          ? 'Toy is in stock'
          : 'Toy is not available in stock'
      },
      date() {
        return new Date(this.toy.createdAt).toLocaleDateString()
      },
      reviews() {
        return this.$store.getters.getReviews
        // return null
      },
    },
    created() {
      var toyId = this.$route.params.id
      this.getToyById(toyId)
      this.getReviews(toyId)
    },
    methods: {
      async getToyById(toyId) {
        this.toy = await this.$store.dispatch({
          type: 'getToyById',
          toyId,
        })
      },
      async getReviews(toyId) {
        await this.$store.dispatch({
          type: 'getReviews',
          filterBy: {toyId},
        })
      },
      async addReview() {
        await this.$store.dispatch({
          type: 'addReview',
          toyId: this.toy._id,
          content: this.review,
        })
        this.review = ''
        this.getReviews(this.toy._id)
        // this.getToyById(this.toy._id);
      },
      saveChatHistory(msgs) {
        console.log('save history')
        if (!this.toy.msgs) this.toy.msgs = []
        this.toy.msgs.push(...msgs)
        this.$store.dispatch({type: 'saveToy', toy: this.toy})
      },
      toggleChat() {
        this.isChat = !this.isChat
      },
    },
  }
</script>
