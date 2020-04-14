import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import attachCognitoModule from '@vuetify/vuex-cognito-module'

/*
attachCognitoModule(store, {
  userPoolId: 'ap-northeast-2_VxaHZJl51',
  userPoolWebClientId: '5v52sr0kc4fnaj6h16qkncltgm',
  region: 'ap-northeast-2'
}, 'cognito')
*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
