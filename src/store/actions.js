import api from '../service'

const setUID = ({ commit }, data) => {
  commit('UID', data)
}

const setErrorState = ({ commit }, data) => {
  commit('ERROR_STATE', data)
}

const setIsAuth = ({ commit }, data) => {
  commit('IS_AUTH', data)
}

const processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'noAuth':
      setErrorState(store, 'Wrong ID or Password')
      setIsAuth(store, false)
      break
    case 'done':
      setErrorState(store, 'No period')
      setIsAuth(store, false)
      break
    default:
      setUID(store, loginResponse.UID)
      setErrorState(store, '')
      setIsAuth(store, true)
  }
}

export default {
  async login (store, { uid, password }) {
    const loginResponse = await api.login(uid, password)
    processResponse(store, loginResponse)
    // return store.getters.getIsAuth
    return loginResponse
  },

  async getS3Object ({ getters, state, commit }) {
    if (getters.getHasS3Object) {
      return getters.getS3Object
    } else {
      commit('GET_S3_OBJECT', api.getS3Object())
      commit('HAS_S3_OBJECT', true)
    }
  },

  async uploadFile ({ getter, state, commit }, { index, file }) {
    const uploadResponse = await api.uploadFile({ index, file })
    return uploadResponse
  },

  async getInventory ({ state, commit }) {
    const inventory = await api.getInventory(state.s3)
    commit('GET_INVENTORY', inventory
      .map(obj => [+obj.Key.split('/')[1], obj])
      .reduce((acc, val) => {
        const index = val[0]
        if (acc[index]) {
          acc[index].push(val[1])
        } else {
          acc[index] = [val[1]]
        }

        return acc
      }, []))
    console.log('commit inventory, inventory: ', state.inventory)
  },

  async getFileUrl ({ getters, state, commit }, key) {
    console.log('key: ', key)
    console.log('hasS3Object: ', getters.getHasS3Object)
    const url = await api.getFileUrl(state.s3, key)
    console.log('url: ', url)
    return url
    // if (getters.getHasS3Object) {
    // } else {
    // alert('You are not logged in!')
    // }
  },

  async getMemoContent ({ getters, state, commit }) {
    const content = await api.getMemo(state.s3)
    commit('SET_MEMO', content)
  },

  async putMemoContent ({ getters, state }, memo) {
    await api.putMemo(state.s3, memo)
  }
}
