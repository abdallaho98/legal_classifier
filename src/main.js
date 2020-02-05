import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LegalTerm from './components/LegalTerm'
import ClassifyScreen from './components/ClassifyScreen'
import AuthScreen from './components/Auth'
import StatScreen from './components/Statistics'
import VueResource from 'vue-resource'
import JsonCSV from 'vue-json-csv'
 
 
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.component('downloadCsv', JsonCSV)



const router = new VueRouter({
  routes: [
    { path: '/', name : 'home' ,component: LegalTerm },
    { path: '/classify', name : 'classify', component: ClassifyScreen },
    { path: '/auth', name : 'auth', component: AuthScreen },
    { path: '/stats', name : 'stats', component: StatScreen }
  ] ,
  mode : 'history',
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')