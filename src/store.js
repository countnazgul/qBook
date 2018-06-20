import Vue from 'vue'
import Vuex from 'vuex'
import R from 'vue-ramda'

Vue.use(Vuex)
// Vue.use(VueRamda)

export default new Vuex.Store({
  state: {
    documents: [],
    notebooks: [
      {
        appId: 1,
        single: {
          code: '',
          history: [
            {
              id: '123',
              code: '',
              codeEvaluated: '',
              result: '',
              timeStamp: ''
            }
          ]
        }
      }
    ],
    history: []
  },
  mutations: {
    SET_DOCUMENTS: function (state, documents) {
      state.documents = documents
    },
    SET_NOTEBOOK: function (state, notebook) {
      state.notebooks.push(notebook)
    },
    SET_SINGLE_HISTORY: function (state, data) {
      state.notebooks.map(function (h) {
        if (h.appId == data.appId) {
          h.single.history = data.history
        }
      })
    },
    REMOVE_HISTORY: function (state, { appId, data, type }) {
      // console.log(appId, data, type)

      console.log(state.notebooks)

      state.notebooks.map(function (h) {
        if (h.appId == appId) {
          h[type].history = h[type].history.map(function (d) {
            return d.id != data.id
          })
        }
      })

      
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
    },
    getNotebook: function ({ commit }, appId) {
      let _this = this

      // let t = R.propEq('read_at', null);

      return new Promise(function (resolve, reject) {

        let notebookData = _this.state.notebooks.filter(function (n) {
          return n.appId == appId
        })

        if (notebookData.length == 1) {
          resolve(notebookData[0])
        } else {
          let newNotebook = {
            appId: appId,
            single: {
              code: 'aaaaaaaaaaa1',
            }
          }

          commit('SET_NOTEBOOK', newNotebook)
          resolve(newNotebook)
        }


      })
    },
    setSingleHistory: function ({ commit }, data) {
      commit('SET_SINGLE_HISTORY', data)
    },
    removeHistory: function ({ commit }, data) {
      commit('REMOVE_HISTORY', data)
    }
  }
})
