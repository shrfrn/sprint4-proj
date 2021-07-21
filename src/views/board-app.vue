<template>
  <section class="board-app">
    <navbar :user="user" @logout="logout" />
    <board-list :boards="boards" />
    <router-view />
  </section>
</template>
<script>
import navbar from '../components/navbar.vue';
import boardList from '../components/board-list.vue';

export default {
    
    computed: {
        boards() {
            return this.$store.getters.boards;
        },
        user(){
            return this.$store.getters.getLoggedinUser
        }
    },
    created() {
        // this.$router.push('/boards/123')
    },
    methods:{
       async logout(){
           console.log('logout');
          await this.$store.dispatch({
        type: "logout",
      
      });
     
    },
        
    },
    components: {
        navbar,
        boardList,
    },
};
</script>
