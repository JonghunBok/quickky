<template>
  <div>
    <h2>Log In</h2>
    <p>aejfoiwajfiowjfoiwafjoi</p>
    <form @submit="onSubmit">
      <input placeholder="Enter youor ID" v-model="uid">
      <input placeholder="Enter youor password" v-model="password">
      <button type="submit">Login</button>
    </form>
    <div class="alert-danger" v-if="errorState">
      <p>Errororororo</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    uid: '',
    password: ''
  }),
  methods: {
    ...mapActions(['login']),
    async onSubmit () {
      try {
        const loginResult = await this.login({
          uid: this.uid,
          password: this.password
        })
        console.log(loginResult)
      } catch (err) {
        console.error(err)
      }
    },
    goToPages () {
      this.$router.push({
        name: 'About'
      })
    }

  }
}
</script>

<style>
</style>
