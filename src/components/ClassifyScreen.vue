<template>
    <div>
        <div class="legal-item">
            <h1>{{legal.number}} الماده</h1>
            <h2 class="text">{{legal.content}}</h2> 
            <h2 class="legal-type">{{type(legal.type)}}</h2>
        </div>
        <div>
            <h2 @click="select" :id="1"  class="legal-select">{{classfication(1)}}</h2>
            <h2 @click="select" :id="2"  class="legal-class">{{classfication(2)}}</h2>
            <h2 @click="select" :id="3"  class="legal-class">{{classfication(3)}}</h2>
            <h2 @click="select" :id="4"  class="legal-class">{{classfication(4)}}</h2>
            <h2 @click="select" :id="5"  class="legal-class">{{classfication(5)}}</h2>
        </div>

        <h1 v-on:click="sendAnswer(3)" class="confirm">تاكيد</h1>
        <h1 v-on:click="skip" class="skip">تخطي</h1>

    </div>
</template>
<script>

import axios from 'axios'

export default {
      name: 'ClassifyScreen',
      data() {
          return {
              selectedItem : 1
          }
      },
       methods : {
        type: function(i){
            switch(i){
                case 1 : return 'القانون المدني';
                case 2 : return 'قانون الإجراءات الـمدنية والإدارية';
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
        sendAnswer : function(){
            axios.post('http://localhost:3000/legal/answer',{
                email : 'abdallaho98@hotmail.fr',
                answer : Number(this.selectedItem) ,
                id : this.legal._id ,
            }).then((response) => {
                alert ('answered')
                window.console.log(response)
                this.$router.go(-1)
            }).catch(err => alert(err))
        },
        skip : function(){
                this.$router.go(-1)
        },

        select : function(e){
            window.console.log(e)
            this.$el.querySelector(".legal-select").classList.add('legal-class')
            this.$el.querySelector('.legal-select').classList.remove('legal-select')
            this.selectedItem = e.target.id
            e.target.classList.add('legal-select')
        }
      },
      computed : {
          classifyRouteParams () {
              return this.$route.params;
          },
          legal () {
              return this.$route.params.legal;
          },
      }
}
</script>
<style scoped>
   .legal-item{
        z-index: 5;
        border: 24px;
        margin: 16px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 5px; /* 5px rounded corners */ 
        padding: 8px 32px 8px 32px;
        line-height: 10px;
        width: 150vh;
        text-align: right;
        display: inline-block;
    }

    .legal-type{
        color: white;
        display: inline-block;
        background-color: rgba(255,155,0,250);
        z-index: 7;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 24px; /* 5px rounded corners */ 
        text-align: right;
        padding: 16px 32px 16px 32px;
    }

    .text{
        line-height: 32px;
    }

    .legal-class{
        color: black;
        display: inline-block;
        background-color: white;
        z-index: 7;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 24px; /* 5px rounded corners */ 
        text-align: right;
        padding: 16px 32px 16px 32px;
        margin: 32px 32px 32px 32px;
    }


    .legal-select{
        color: white;
        display: inline-block;
        background-color: green;
        z-index: 7;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 24px; /* 5px rounded corners */ 
        text-align: right;
        padding: 16px 32px 16px 32px;
        margin: 32px 32px 32px 32px;
    }

     .confirm{
        color: white;
        display: inline-block;
        background-color: rgb(0, 200, 50);
        z-index: 7;
        width: 150vh;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 24px; /* 5px rounded corners */ 
        text-align: center;
        padding: 16px 32px 16px 32px;
        margin: 32px 32px 32px 32px;
    }


     .skip{
        width: 150vh;
        color: white;
        display: inline-block;
        background-color: red;
        z-index: 7;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 24px; /* 5px rounded corners */ 
        text-align: center;
        padding: 16px 32px 16px 32px;
        margin: 32px 32px 32px 32px;
    }
</style>
 