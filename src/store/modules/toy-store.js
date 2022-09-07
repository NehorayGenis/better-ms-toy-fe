import { toyService } from '@/services/toy.service.js'
import { socketService } from '../../services/socket.service'

export default {
  state: {
    toys: null,
    filterBy: null,
  },
  getters: {
    getToys(state) {
      return state.toys
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },

    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },

    sortBy(state, { sortBy }) {
      var toys = JSON.parse(JSON.stringify(state.toys))
      if (!sortBy) state.toys = toys
      else
        state.toys = toys.sort((a, b) => {
          let valA = a[sortBy]
          let valB = b[sortBy]
          if (sortBy === 'name') {
            valA = valA.toLowerCase()
            valB = valB.toLowerCase()
          }
          return valA > valB ? 1 : -1
        })
    },

    removeToy(state, { toyId }) {
      var toys = JSON.parse(JSON.stringify(state.toys))
      var toyIdx = toys.findIndex((toy) => toy._id === toyId)
      toys.splice(toyIdx, 1)
      state.toys = toys
    },

    addToy(state, { toy }) {
      state.toys.push(toy)
    },

    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === toy._id)
      state.toys.splice(idx, 1, toy)
    },
  },
  actions: {
    async loadToys(context) {
      try {
        var filterBy = context.state.filterBy ? context.state.filterBy : ''
        const toys = await toyService.getToys(filterBy)
        context.commit({ type: 'setToys', toys: toys })
        return toys
      } catch (err) {
        console.log(err)
      }
    },

    async getToyById(context, { toyId }) {
      try {
        return await toyService.getToyById(toyId)
      } catch (err) {
        console.log(err)
      }
    },

    getEmptyToy() {
      return toyService.getEmptyToy()
    },

    async removeToy(context, { toyId }) {
      try {
        await toyService.removeToy(toyId)
        context.commit({ type: 'removeToy', toyId })
        socketService.emit('deleteToy', toyId)
        return
      } catch (err) {
        console.log(err)
      }
    },

    async saveToy(context, { toy }) {
      try {
        // if (!context.state.toys) await context.dispatch({ type: 'loadToys' })
        const isEdit = !!toy._id
        const savedToy = await toyService.saveToy(toy)
        context.commit({ type: isEdit ? 'updateToy' : 'addToy', toy: savedToy })
      } catch (err) {
        console.log(err)
      }
    },

    // async addReview(context, { toyId, reviewTxt }) {
    //   const user = context.rootGetters.getUser;
    //   if (!user) return router.push('/login');
    //   const review = {
    //     txt: reviewTxt,
    //     miniUser: {
    //       id: user._id,
    //       username: user.username
    //     }
    //   }
    //   const updatedToy = await toyService.addReview(toyId, review)
    //   context.commit({ type: 'updateToy', toy: updatedToy })
    // }
  },
  modules: {},
}
