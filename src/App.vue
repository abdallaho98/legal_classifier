<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
//import LegalTerm from './components/LegalTerm';
import {config} from './helpers/firebaseConfig'
import firebase from 'firebase'

export default {
  name: 'app',
  components: {
  },
  created(){
      firebase.initializeApp(config);
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
