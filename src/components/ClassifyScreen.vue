<template>
    <div>
        <div class="legal-item" @click="skip">
            <h1>{{legal.number}} الماده</h1>
            <h2 class="text">{{legal.content}}</h2> 
            <h2 class="legal-type">{{type(legal.type)}}</h2>
            <div>
                <h3 @click="tagger" :id="1" ref="t1" class="legal-tag">{{taggeration(1)}}</h3>
                <h3 @click="tagger" :id="2" ref="t2" class="legal-tag">{{taggeration(2)}}</h3>
                <h3 @click="tagger" :id="3" ref="t3" class="legal-tag">{{taggeration(3)}}</h3>
            </div>
        </div>
        <div>
            <h2 @click="select" :id="1" ref="b1" class="legal-class">{{classfication(1)}}</h2>
            <h2 @click="select" :id="2" ref="b2" class="legal-class">{{classfication(2)}}</h2>
            <h2 @click="select" :id="3" ref="b3" class="legal-class">{{classfication(3)}}</h2>
            <h2 @click="select" :id="4" ref="b4" class="legal-class">{{classfication(4)}}</h2>
            <h2 @click="select" :id="5" ref="b5" class="legal-class">{{classfication(5)}}</h2>
        </div>

        <h1 v-on:click="sendAnswer(3)" class="confirm">تاكيد</h1>
        <h1 v-on:click="skip" class="skip">تخطي</h1>
        <h1 v-on:click="signaler" class="signaler">الإبلاغ عن خطأ</h1>

    </div>
</template>
<script>

import axios from 'axios'
import firebase from 'firebase'
import { EventBus } from './event-bus.js';

export default {
      name: 'ClassifyScreen',
      props: ['legal'],
      data() {
          return {
              predictItem : 0,
              selectedItem : 0,
              tagItem : 0,
              url : 'https://legal-classifier-backend.herokuapp.com'
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
        taggeration: function(i){
            switch(i){
                case 0 : return '';
                case 1 : return 'معدل';
                case 2 : return 'ملغى';
                case 3 : return 'جديد';
                default : return '';
            }
        },
        sendAnswer : function(){
            axios.post(`${this.url}/predict/add`,{
                predict : this.predictItem,
                answer : this.selectedItem ,
                legal : this.legal._id ,
            }).then((response) => {
                window.console.log(response.data)
                axios.post(`${this.url}/legal/answer`,{
                    email : firebase.auth().currentUser.email,
                    answer : Number(this.selectedItem) ,
                    id : this.legal._id ,
                    tag : this.tagItem
                }).then((response) => {
                    window.console.log(response.data)
                    const data = { email : firebase.auth().currentUser.email , answer : Number(this.selectedItem)  }
                    EventBus.$emit('answer-send', data);
                    //this.$router.go(-1)
                })
            })

        },
        skip : function(){
                //this.$router.go(-1)
                EventBus.$emit('skip-item', -1);
        },

        signaler : function(){
                axios.post(`${this.url}/legal/signaler`,{
                    id : this.legal._id ,
                }).then((response) => {
                    window.console.log(response.data)
                    EventBus.$emit('signal-item', -1);
                })
            
        },


        select : function(e){
            window.console.log(e)
            if(this.$el.querySelector(".legal-select") != null){
                this.$el.querySelector(".legal-select").classList.add('legal-class')
                this.$el.querySelector('.legal-select').classList.remove('legal-select')
            }
            this.selectedItem = e.target.id,
            e.target.classList.add('legal-select')
        },

        tagger : function(e){
            window.console.log(e)
            if(this.$el.querySelector(".legal-tag-select") != null){
                this.$el.querySelector(".legal-tag-select").classList.add('legal-tag')
                this.$el.querySelector('.legal-tag-select').classList.remove('legal-tag-select')
            }
            this.tagItem = e.target.id,
            e.target.classList.add('legal-tag-select')
        }
      },
      computed : {
          classifyRouteParams () {
              return this.$route.params;
          },
      },
      mounted(){
          if(this.legal.tag != 0){
                this.tagItem = this.legal.tag
                this.$refs["t"+this.tagItem].classList.add('legal-tag-select')
          }
          axios.post(`${this.url}/legal/predict`,{
                content : this.legal.content ,
            }).then((response) => {
                if(this.legal.answer == 0){
                    this.predictItem = response.data.predict
                    this.selectedItem = this.predictItem
                    this.$refs["b"+this.predictItem].classList.add('legal-select')
                } else {
                    this.predictItem = response.data.predict
                    this.selectedItem = this.legal.answer
                    this.$refs["b"+this.selectedItem].classList.add('legal-select')
                }
               
            })
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
    .signaler{
        width: 150vh;
        color: white;
        display: inline-block;
        background-color: rgb(255,165,0);
        z-index: 7;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 24px; /* 5px rounded corners */ 
        text-align: center;
        padding: 16px 32px 16px 32px;
        margin: 32px 32px 32px 32px;
    }

     .legal-tag{
        color: blue;
        display: inline-block;
        background-color: white;
        z-index: 14;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 24px; /* 5px rounded corners */ 
        text-align: right;
        padding: 16px 32px 16px 32px;
        margin: 32px 32px 32px 32px;
    }


    .legal-tag-select{
        color: white;
        display: inline-block;
        background-color: blue;
        z-index: 14;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        border-radius: 24px; /* 5px rounded corners */ 
        text-align: right;
        padding: 16px 32px 16px 32px;
        margin: 32px 32px 32px 32px;
    }
</style>
 