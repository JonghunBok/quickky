import loginAPI from './loginAPI'
import s3API from './s3API'

export default {
  async login (uid, password) {
    try {
      const loginResponse = await loginAPI.login(uid, password)
      return loginResponse
    } catch (err) {
      console.error(err)
    }
  },
  ...s3API
}
