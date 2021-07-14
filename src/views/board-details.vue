<template>
    <section class="board-details">
        <!-- BOARDDETAILS -->
        <!-- RENDER THE BOARD HEADER -->
        <board-header />
        <router-link to="/boards/123/task/456">task</router-link>
        <router-view />
    </section>
</template>

<script>
import boardHeader from '../components/board-header.vue';
export default {
    data() {
        return {};
    },

    components: {
        boardHeader,
    },
};
</script>

<style></style>
