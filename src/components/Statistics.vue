<template>
    <div class="block align_left">
        <div v-bind:key="stat.id" v-for="stat in data">
            <H1 class="right">{{stat.email}}</H1>
            <H1 class="left">{{stat.nb}}</H1>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Statistics',
    data: function () {
        return {
            data: null
        }
     },
    mounted(){
        axios.get('http://localhost:3000/users/statistics').then((response) => {
            this.data = response.data.stats ; 
            }).catch(err => alert(err))
     } ,
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

</style>
