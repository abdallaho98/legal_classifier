<template>
    <div class="all">
        <download-csv :data="exportCsv"><button class="button">Export Data</button></download-csv>
        <div class="all"> 
            <div class="block align_left">
                <H1 class="right">Email</H1>
                <H1 class="left">Nb</H1>
                <div v-bind:key="stat.id" v-for="stat in data">
                    <H1 class="right">{{stat.email}}</H1>
                    <H1 class="left">{{stat.nb}}</H1>
                </div>
            </div>

            <div class="block align_left">
                <H1 class="right">Type</H1>
                <H1 class="left">Nb</H1>
                <div v-bind:key="stat.id" v-for="(stat , index) in types">
                    <H1 class="right">{{type(index)}}</H1>
                    <H1 class="left">{{stat}}</H1>
                </div>
            </div>
            <div class="block align_left">
                <H1 class="right">Class</H1>
                <H1 class="left">Nb</H1>
                <div v-bind:key="stat.id" v-for="(stat , index) in classess">
                    <H1 class="right">{{classfication(index)}}</H1>
                    <H1 class="left">{{stat}}</H1>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Statistics',
    data: function () {
        return {
            data: null ,
            types: null ,
            classess: null,
            exportCsv: null,
            url : 'https://legal-classifier-backend.herokuapp.com',
        }
     },
    mounted(){
        axios.get(`${this.url}/users/statistics`).then((response) => {
            this.data = response.data.stats ; 
            }).catch(err => alert(err))
        axios.get(`${this.url}/legal/type`).then((response) => {
            this.types = response.data.stats ; 
            }).catch(err => alert(err))
        axios.get(`${this.url}/legal/class`).then((response) => {
            this.classess = response.data.stats ; 
            }).catch(err => alert(err))
        axios.get(`${this.url}/legal/export`).then((response) => {
            this.exportCsv = response.data.legals ; 
            }).catch(err => alert(err))
     } ,
    methods : {
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
        classfication: function(i){
            switch(i){
                case 0 : return '';
                case 1 : return 'حق';
                case 2 : return 'مسموح به';
                case 3 : return 'واجب';
                case 4 : return 'ممنوع';
                case 5 : return 'لاشئ';
                default : return '';
            }
        },
    }
}
</script>
<style scoped>
    .block{
            z-index: 5;
            border: 24px;
            margin: 16px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            border-radius: 5px; /* 5px rounded corners */ 
            padding: 8px 32px 8px 32px;
            line-height: 10px;
            width: 80vh;
            display: inline-block;
        }
    .left {
        float: left; 
        width: 20%;
        text-align: center;
        align-items: center;
    }

    .right {
        float: right; 
        width: 80%;
        text-align: right;
    }

    .align_left{
        float: right;
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
    .all{
        width: 100%;
    }

</style>
