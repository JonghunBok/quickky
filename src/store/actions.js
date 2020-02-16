import { UID, IS_AUTH, ERROR_STATE } from './mutation_types'
import api from '../service'

const setUID = ({ commit }, data) => {
  commit(UID, data)
}

const setErrorState = ({ commit }, data) => {
  commit(ERROR_STATE, data)
}

const setIsAuth = ({ commit }, data) => {
  commit(IS_AUTH, data)
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
    return store.getters.getIsAuth
  }
}
