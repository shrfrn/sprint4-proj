<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
            <router-link to="/boards/b101">boards</router-link>
        </div>
        <helloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/components/hello-world.vue';

export default {
    name: 'home',
    components: {
        helloWorld,
    },
};
</script>
