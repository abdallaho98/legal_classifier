<template>
  <div id="app">
    <LegalTerm v-bind:legals="legals" />
  </div>
</template>

<script>
import LegalTerm from './components/LegalTerm';

export default {
  name: 'app',
  components: {
    LegalTerm
  },
  data() {
    return {
      legals: [
        {
            number : 1,
            description : 'Hello'
        },
        {
            number : 2,
            description : 'Games'
        },
        {
            number : 3,
            description : 'World'
        },
      ]
    }
  },  
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
