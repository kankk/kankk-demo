import Vue from 'vue'
import App from './App.vue'

import Alert from '../src/components/alert/alert';

Vue.config.productionTip = false

Vue.prototype.$alert = Alert;

new Vue({
  render: h => h(App),
}).$mount('#app')
