<template>
     <div class="legal-item">
        <h1>{{legal.number}}</h1>
        <h2>{{legal.description}}</h2>    
    </div>
</template>
<script>
export default {
      name: 'legalMada',
      props: ['legal']
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
        text-align: right;
        padding: 8px 32px 8px 32px;
    }
</style>
 