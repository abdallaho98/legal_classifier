<template>
     <div class="legal-item" @click="open">
         <div class="right">
            <h1>{{legal.number}} الماده</h1>
            <h2 class="text">{{legal.content}}</h2> 
            <h2  class="legal-type">{{type(legal.type)}}</h2>
         </div>
         <div class="left">
            <img class="padding" :src="legal.answrer != null ? marked : unmarked" alt="check" border="0" >
            <h2 class="green">{{classfication(legal.answer)}}</h2>
            <h2 class="mail" v-if="legal.answrer != null" >{{legal.answrer != null ? legal.answrer.email : ''}}</h2>
         </div>
    </div>
</template>
<script>

export default {
      name: 'LegalItem',
      props: ['legal'],
      methods : {
        open : function() {
            window.console.log(this.legal.content)
            this.$router.push( { path : '/classify' ,name : 'classify', params : { legal : this.legal }})
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
        }
      },
      data: function() {
          return{
            marked: 'https://i.ibb.co/dM333b0/check.png',
            unmarked: 'https://i.ibb.co/CKXdZCQ/close.png'
          }
      },
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

    .green{
        color: green;
    }

    .mail{
        padding-top: 10px;
    }
    .padding{
        padding-top: 16px;
    }
    .text{
        line-height: 32px;
    }
</style>
 