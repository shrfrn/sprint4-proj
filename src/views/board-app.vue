<template>
    <section class="board-app">
        <navbar/>
        <board-list :boards="boards"/>
        <router-view/>
    </section>
</template>
<script>
import navbar from '../components/navbar.vue'
import boardList from '../components/board-list.vue'

export default {

    computed: {
        boards() { return this.$store.getters.boards }
    },
    created(){
        this.$router.push('/boards/123')
    },
    components:{
        navbar,
        boardList
    }
}
</script>
