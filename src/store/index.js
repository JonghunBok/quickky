import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cognito: {
      userPoolId: 'ap-northeast-2_a0d82dq4h',
      region: 'ap-northeast-2',
      clientId: '2tfichnft35e7gc774qqdlr1n2'
    },
    api: {
    },
    inventory: [],
    s3: {}
  },
  mutations,
  actions,
  getters,
  modules: {
  }
})
