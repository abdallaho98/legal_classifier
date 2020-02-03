<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
//import LegalTerm from './components/LegalTerm';

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      legals: [
        {
            id : "5e2faa1e955fc8096227fee1",
            number : 1,
            content : 'Hello nfbkjfbjfbzejfbajfbajfbazjofbazjfazojfbazofbazofbazbfl \n fezkhfoehf \n fiaubfuiaofnabdkjzbjdbzaljdbazljdblazjbdlazbldzbkabkdazbvksgesgfuoegfoezgofze zalbfjlzabdlazbdlazbdlazjbdlazbldlazdjazbdlazjda'
        },
        {
            id: '5e2faa1e955fc8096227fee1',
            number : 2,
            content : 'Games'
        },
        {
            number : 3,
            content : 'World'
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
