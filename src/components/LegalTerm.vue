<template>
    <div>
        <div class="left">
            <vue-csv-import :catch="error" :callback="reload" :headers="true" url="http://localhost:3000/legal/addall" :map-fields="{content: 'content', number: 'number' , type : 'type'}"></vue-csv-import>
        </div>
        <div class="right">
            <button @click="stats" class="button" style="vertical-align:middle"><span>الاحصائيات </span></button>
        </div>
         <input @change="tag" class="search" placeholder="البحث عن طريق كلمات مفتاحية">
        <div  v-bind:key="legal.id" v-for="legal in data">
            <LegalItem v-bind:legal="legal"/>
        </div>
    </div>
</template>

<script>
import LegalItem from './LegalItem'
import axios from 'axios'
import { VueCsvImport } from 'vue-csv-import'
import firebase from 'firebase'
import {config} from '../helpers/firebaseConfig'

export default {
     name: 'LegalTerm',
     props: ['legals'],
     components:{
         LegalItem , VueCsvImport
     },
     data: function () {
        return {
            data: null
        }
     },
     created() {
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(user =>  {
            if (user) {
                axios.post('http://localhost:3000/users/register',{
                    email : firebase.auth().currentUser.email,
                }).then((response) => {
                    window.console.log(response.data)
                }).catch(err => alert(err))
            } else {
                this.$router.push( { path : '/auth' ,name : 'auth'})
            }
        });
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
        },
        reload: function (){
            this.$router.go(0)
        },
        error : function (){
            alert ('error')
        },
        stats : function(){
              this.$router.push( { path : '/stats' ,name : 'stats'})
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

    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }

    .button {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        z-index: 7;
        display: inline-block;
        border-radius: 4px;
        background-color: #ffffff;
        border: none;
        color: #000000;
        text-align: center;
        font-size: 28px;
        padding: 20px;
        width: 200px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
    }

    .left {
        float: left; 
        width: 50%;
        text-align: center;
        align-items: center;
    }

    .right {
        padding-right: 100px;
        float: right; 
        width: 50%;
        text-align: right;
    }


</style>


