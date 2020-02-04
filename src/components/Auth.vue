<template>
    <div >
        <span class="label">Sign in with:</span>
        <div id="firebaseui-auth-container"></div>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import * as firebaseui from "firebaseui"
export default {
  mounted() {
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        
        var uiConfig = {
            signInSuccessUrl: "/",
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
  }
}
</script>

<style scoped>

</style>
