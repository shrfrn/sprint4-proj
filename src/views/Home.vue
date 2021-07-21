<template>
    <div class="home">
        <section class="header">
            <div id="nav">
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link :to="`/board/60f7b1e3c66d343ab4f0c567`">Boards</router-link>
            </div>
            <section class="back"></section>
            <button class="aaa" @click="start">start as guest</button>
            <button class="aaa" @click="dialogVisible = true">login</button>
            <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
                <login-signup @hide="handleClose" @login-signup="handleClose" />
                <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
            </el-dialog>
        </section>
        <section class="info">
            <div class="pro">
                <div class="icon"><i class="fas fa-tasks"></i></div>
                <h3>Project Manegment</h3>
                <p>Project management Plan, track, and manage any project from start to finish</p>
            </div>
            <div class="icon"><i class="fas fa-code"></i></div>
            <div class="icon"><i class="fas fa-building"></i></div>
        </section>
    </div>
</template>

<script>
import loginSignup from './login-signup.vue';
export default {
    components: { loginSignup },
    name: 'home',
    data() {
        return {
            dialogVisible: false,
        };
    },
    computed: {
        initBoard() {
            return this.$store.getters.boards[0]._id;
        },
    },
    methods: {
        start() {
            this.$router.push(`/board/60f7b1e3c66d343ab4f0c567`);
        },
        handleClose() {
            this.dialogVisible = false;
        },
        login() {
            this.$router.push(`login`);
        },
    },
};
</script>
