import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      number: 0,
      value: 0,
      bot: 0,
      numOfGuesses: 0,
      winner: true
  },
  getters: {
    value: state => {
      return state.value;
    }

  },
  mutations: {
    newValue: (state, payload) => {
      state.value = payload;
    }
  },
  actions: {
    newValue: ({commit}, payload) => {
      commit('newValue', payload)
    }
  }
})
