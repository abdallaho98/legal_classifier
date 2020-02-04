<template>
    <div>
        <input @change="tag" class="search" placeholder="البحث عن طريق كلمات مفتاحية">
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
            }).catch(err => alert(err))
     } ,
     methods: {
        tag: function (e) {
            window.console.log(e.target.value)
            axios.get(`http://localhost:3000/legal/?tag=${e.target.value}`).then((response) => {
            this.data = response.data.legals ; 
            }).catch(err => alert(err))
        }
     }
}
</script>

<style scoped>
    .search{
        font-size: 24px;
        color: black;
        display: inline-block;
        background-color: white;
        z-index: 7;
        width: 150vh;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 36px; /* 5px rounded corners */ 
        text-align: right;
        padding: 16px 32px 16px 32px;
        margin: 32px 32px 32px 32px;
    }


</style>


