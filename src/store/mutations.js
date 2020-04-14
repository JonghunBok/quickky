export default {
  UID (state, uid) {
    state.uid = uid
  },

  ERROR_STATE (state, errorState) {
    state.errorState = errorState
  },

  IS_AUTH (state, isAuth) {
    state.isAuth = isAuth
  },

  GET_S3_OBJECT (state, obj) {
    state.s3 = obj
  },

  HAS_S3_OBJECT (state, hasS3Object) {
    state.hasS3Object = hasS3Object
  },

  GET_INVENTORY (state, inventory) {
    state.inventory = inventory
  }
}
