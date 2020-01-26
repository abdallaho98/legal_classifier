<template>
    <div>
        <div v-bind:key="legal.number" v-for="legal in legals">
            <LegalItem v-bind:legal="legal"/>
        </div>
    </div>
</template>

<script>
import LegalItem from './LegalItem';
export default {
     name: 'Term',
     props: ['legals'],
     components:{
         LegalItem
     }
}
</script>

<style scoped>

</style>


