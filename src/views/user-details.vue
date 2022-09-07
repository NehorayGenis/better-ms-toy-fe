<template>
  <div v-if="user" class="user-details container">
    <h3>Hello {{ user.fullname }}</h3>
    <h3>Username: {{ user.username }}</h3>

    <details v-if="reviews" class="review-list">
      <summary>Your Reviews</summary>
      <div v-for="review in reviews" :key="review._id" class="review-preview">
        <h4>About: {{ review.toy.name }}</h4>
        <p>Review: {{ review.content }}</p>
      </div>
    </details>
  </div>
  <h3 v-else>No logged In user</h3>
</template>

<script>
export default {
  name: 'user-details',
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    reviews() {
      return this.$store.getters.getReviews;
    }
  },
  created() {
    this.$store.dispatch({
      type: 'getReviews',
      filterBy: {userId: this.user._id}
    })
  }
};
</script>

<style lang="scss">
h3 {
  text-align: center;
}
summary {
  margin-bottom: 8px;
}
</style>