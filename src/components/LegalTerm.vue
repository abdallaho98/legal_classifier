<template>
    <div>
        <div class="left">
            <vue-csv-import :catch="error" :callback="reload" :headers="true" url="http://localhost:3000/legal/addall" :map-fields="{content: 'content', number: 'number' , type : 'type'}"></vue-csv-import>
        </div>
        <div class="right">
            <button @click="stats" class="button" style="vertical-align:middle"><span>الاحصائيات </span></button>
        </div>
        <div  class="searchbar">
            <input @change="tag" class="search" placeholder="البحث عن طريق كلمات مفتاحية">
            <select @change="typeSearch" class="searchtype" name="dropdown">
                <option value="" selected=true></option>
                <option value="1">{{type(1)}}</option>
                <option value="2">{{type(2)}}</option>
                <option value="3">{{type(3)}}</option>
                <option value="4">{{type(4)}}</option>
                <option value="5">{{type(5)}}</option>
                <option value="6">{{type(6)}}</option>
                <option value="7">{{type(7)}}</option>
                <option value="8">{{type(8)}}</option>
                <option value="9">{{type(9)}}</option>
                <option value="10">{{type(10)}}</option>
                <option value="11">{{type(11)}}</option>
                <option value="12">{{type(12)}}</option>
                <option value="13">{{type(13)}}</option>
                <option value="14">{{type(14)}}</option>
            </select>
        </div>
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
            data: null,
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
        callApi: function (tag , type) {
            if(tag.length > 0 && type.length > 0) {
                axios.get(`http://localhost:3000/legal/?type=${type}&tag=${tag}`).then((response) => {
                this.data = response.data.legals ; 
                }).catch(err => alert(err))
            } else if(tag.length == 0 && type.length > 0) {
                axios.get(`http://localhost:3000/legal/?type=${type}`).then((response) => {
                this.data = response.data.legals ; 
                }).catch(err => alert(err))
            } else if(tag.length > 0 && type.length == 0) {
                axios.get(`http://localhost:3000/legal/?tag=${tag}`).then((response) => {
                this.data = response.data.legals ; 
                }).catch(err => alert(err))
            } else {
                axios.get(`http://localhost:3000/legal/`).then((response) => {
                this.data = response.data.legals ; 
                }).catch(err => alert(err))
            }
        },
        tag: function (e) {
            const typeS =  this.$el.querySelector(".searchtype").value
            this.callApi(e.target.value,typeS)
        },
        typeSearch: function (e) {
            const tagS =  this.$el.querySelector(".search").value
            this.callApi(tagS , e.target.value)
        },
        reload: function (){
            this.$router.go(0)
        },
        error : function (){
            alert ('error')
        },
        stats : function(){
              this.$router.push( { path : '/stats' ,name : 'stats'})
        },
        type: function(i){
            switch(i){
                case 1 : return 'القانون المدني';
                case 2 : return 'قانون الإجراءات المدنية والإدارية';
                case 3 : return 'القانون التجاري';
                case 4 : return 'قانون الأسرة';
                case 5 : return 'قانون الجنسية الجزائرية';
                case 6 : return 'قانون العقوبات';
                case 7 : return 'قانون الإجراءات الجزائية';
                case 8 : return 'قانون تنظيم السجون وإعادة الإدماج الإجتماعي للمحبوسين';
                case 9 : return 'قانون القضاء العسكري';
                case 10 : return 'قانون المعاشات العسكرية';
                case 11 : return 'قانون الانتخابات';
                case 12 : return 'قانون الجماعات الإقليمية';
                case 13 : return 'قانون الصفقات العمومية و تفويضات المرفق العام';
                case 14 : return 'قانون الإعـلام';
                default : return 'قوانين اخرى';
            }
        },
     }
}
</script>

<style scoped>
    .search{
        font-size: 24px;
        color: black;
        text-align: right;
        width: 60%;
        float: right;
        padding: 16px 32px 16px 32px;
        background-color: transparent;
        border: 0px solid;
    }

    .searchbar{
        z-index: 7;
        width: 150vh;
        display: inline-block;
        background-color: white;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 36px; /* 5px rounded corners */ 
        margin: 32px 32px 32px 32px;
    }

     .searchtype{
        margin: 16px 32px 16px 32px;
        text-align: center;
        align-items: center;
        font-size: 24px;
        color: black;
        text-align: right;
        width: 20%;
        float: left;
        background-color: transparent;
        border: 0px solid;
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


