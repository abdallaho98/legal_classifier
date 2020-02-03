<template>
    <div>
        <div  v-bind:key="legal.id" v-for="legal in data">
            <LegalItem v-bind:legal="legal"/>
        </div>
    </div>
</template>

<script>
import LegalItem from './LegalItem';
import axios from 'axios'

export default {
     name: 'LegalTerm',
     props: ['legals'],
     components:{
         LegalItem
     },
     data: function () {
        return {
            data: null
        }
     },
     mounted(){
        axios.get('http://localhost:3000/legal/').then((response) => {
            this.data = response.data.legals ; 
            window.console.log(response)
            }).catch(err => alert(err))
     } ,
}
</script>

<style scoped>

</style>


