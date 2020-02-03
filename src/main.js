import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LegalTerm from './components/LegalTerm';
import ClassifyScreen from './components/ClassifyScreen';
import VueResource from 'vue-resource'
 
Vue.use(VueRouter)
Vue.use(VueResource)


const router = new VueRouter({
  routes: [
    { path: '/', name : 'home' ,component: LegalTerm },
    { path: '/classify', name : 'classify', component: ClassifyScreen }
  ] ,
  mode : 'history',
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')