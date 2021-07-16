<template>
    <div class="home">
        
        <div id="nav">
            <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
            <router-link to="/boards/b101">Boards</router-link>
        </div>
        <section></section>
        <button @click="start">start as guest</button>
    </div>
</template>

<script>
 

export default {
    name: 'home',
   methods:{
       start(){
           this.$router.push('/boards/b101')
       }
   }
};
</script>
