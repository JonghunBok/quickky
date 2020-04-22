export default {
  getUid: state => state.uid,
  getErrorState: state => state.errorState,
  getIsAuth: state => state.isAuth,
  getCognitoConfig: state => state.cognito,

  getInventory: state => state.inventory,
  getS3Object: state => state.s3,
  getHasS3Object: state => state.hasS3Object,
  getBox: state => id => state.inventory[id],

  getMemo: state => state.memo
}
