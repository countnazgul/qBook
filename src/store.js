import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    documents: []
  },
  mutations: {
    SET_DOCUMENTS: function (state, documents) {
      state.documents = documents
    }

  },
  actions: {
    setDocuments: function ({ commit }) {
      let documents = [
        {
          qDocId: 1,
          qTitle: 'Document 1'
        },
        {
          qDocId: 2,
          qTitle: 'Document 2'
        },
        {
          qDocId: 3,
          qTitle: 'Document 3'
        },
        {
          qDocId: 4,
          qTitle: 'Document 4'
        },
        {
          qDocId: 5,
          qTitle: 'Document 5'
        },
      ]
      commit('SET_DOCUMENTS', documents)

      return new Promise((resolve, reject) => {
        resolve(documents)
      })
    }
  }
})
