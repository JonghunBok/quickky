<template>
  <div>
    <form @submit="onSubmit">
      <input placeholder="Enter your id" v-model="uid"> <br/>
      <input placeholder="Enter your password" v-model="password"> <br/>
      <button type="submit">Login</button>
    </form>
    <div class="alert-danger" v-if="errorState">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',

  data: () => ({
    uid: '',
    password: '',
    errorState: false
    // attr: this.$store.getters['cognito/username']
  }),

  methods: {
    ...mapActions(['login', 'getS3Object']),

    async onSubmit () {
      if (await this.login(this.uid, this.password)) {
        await this.getS3Object()
        this.goToPages()
      } else {
        alert('Login Failed!')
      }
    },

    goToPages () {
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style>
</style>
