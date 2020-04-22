import AWS from 'aws-sdk'
import ids from '../assets/ids.json'

export default {
  async login (uid, password) {
    try {
      AWS.config.region = ids.region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: ids.IdentityPoolId
      })

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }
}
