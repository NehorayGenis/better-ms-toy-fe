import { reviewService } from '../../services/review.service.js';
import router from '../../router'

export default {
  state: {
    reviews: null
  },
  getters: {
    getReviews(state) {
      return state.reviews
    }
  },
  mutations: {
    setReviews(state, { reviews }) {
      state.reviews = reviews
    },
    addReview(state, {review}) {
      state.reviews.push(review)
    }
  },
  actions: {
    async getReviews({ commit }, { filterBy }) {
      try {
        const reviews = await reviewService.query(filterBy);
        commit({
          type: 'setReviews',
          reviews
        })
      } catch (err) {
        console.log(err);
      }
    },
    async addReview(context, { content, toyId }) {
      const user = context.rootGetters.getUser;
      if (!user) return router.push('/login');
      const review = {
        content,
        userId: user._id,
        toyId
      }
      await reviewService.addReview(review);
      // context.commit({
      //   type: 'addReview',
      //   review: addedReview
      // })
    }
  },
};