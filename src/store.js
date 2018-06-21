import Vue from 'vue'
import Vuex from 'vuex'
// import R from 'vue-ramda'

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
    historySingle: [],
    historyMulti: [],
    sections: [],
    test: 1,
    blaaaa: [
      {
        appId: "10",
        sectionId: '1234567890',
        code: "123",
        codeEvaluated: "123",
        id: "f11d3b2e-8345-4261-a012-e17540c03db9",
        result: "78720cd6-2cdd-4b85-b7eb-dea78c71d867",
        timeStamp: "Thu Jun 21 2018 16:54:14 GMT+0100 (GMT Daylight Time)",
      }
    ]

  },
  mutations: {
    SET_DOCUMENTS: function (state, documents) {
      state.documents = documents
    },
    SET_NOTEBOOK: function (state, notebook) {
      state.notebooks.push(notebook)
    },
    SET_SINGLE_HISTORY: function (state, data) {
      state.historySingle.push(data)
    },
    REMOVE_SINGLE_HISTORY: function (state, id) {
      state.historySingle = state.historySingle.filter(function (s) {
        return s.id != id
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


    },
    TEST: function (state) {
      state.historySingle[0].data = state.historySingle[0].data + 10
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
    removeSingleHistory: function ({ commit }, data) {
      commit('REMOVE_SINGLE_HISTORY', data)
    },
    removeHistory: function ({ commit }, data) {
      commit('REMOVE_HISTORY', data)
    },
    getSingleHistory: function ({ commit }, appId) {
      let _this = this
      return new Promise(function (resolve, reject) {

        let singleHistoryData = _this.state.historySingle.filter(function (h) {
          return h.appId == appId
        })

        resolve(singleHistoryData)
      })
    },
    test: function ({ commit }) {
      return new Promise(function (resolve, reject) {
        commit('TEST')
      })
    }
  },
  getters: {
    doneTodosCount: (state, getters) => {
      return state.test
    },
    singleHistory2(state) {
      return (appId) => {
        return bar;
      }
    },
    singleHistory: (state, getters) => {
      return state.historySingle
    },
    getMovieById: (state, getters) => (id) => {
      // return state.movies.find(movie => movie.id === id)
      let singleHistoryData = state.historySingle.filter(function (h) {
        return h.appId == appId
      })

      return singleHistoryData
    }
  }
})
