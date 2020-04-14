import AWS from 'aws-sdk'


export default {
  async login (uid, password) {
    try {
      AWS.config.region = '' // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: ''
      })

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }
}
