<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link :to="`/boards/b101`">Boards</router-link>
        </div>
        <section class="back"></section>
        <button class="aaa" @click="start">start as guest</button>
        <button class="aaa" @click="dialogVisible = true">login</button>
        <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <login-signup @login-signup="handleClose" />
            <el-button @click="dialogVisible = false">Cancel</el-button>
        </el-dialog>
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
            this.$router.push(`/boards/${this.initBoard}`);
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
