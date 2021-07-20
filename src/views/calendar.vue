<template>
    <section class="board-app">
        <navbar />
        <el-calendar class="calendar" v-model="value"> </el-calendar>
    </section>
</template>

<script>
import navbar from '../components/navbar.vue';

export default {
    data() {
        return {
            value: new Date(),
        };
    },
    components: {
        navbar,
    },
};
</script>

<style>
.is-selected {
    color: #1989fa;
}
</style>
