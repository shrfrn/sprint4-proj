<template>
    <section class="login-signup">
        <el-tabs v-model="activeTab">
            <el-tab-pane class="tab-label" label="Login" name="login">
                <el-form label-width="100px" :model="userCreds">
                    <el-form-item label="username">
                        <el-input v-model="userCreds.username"></el-input>
                    </el-form-item>
                    <el-form-item label="password">
                        <el-input v-model="userCreds.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="onLogin">Login</el-button>
                        <el-button type="danger" plain @click="hide">Cancel</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="Sign Up" name="signup">
                <el-form label-width="100px" :model="userCreds">
                    <el-form-item label="Full name">
                        <el-input v-model="userCreds.fullname"></el-input>
                    </el-form-item>
                    <el-form-item label="username">
                        <el-input v-model="userCreds.username"></el-input>
                    </el-form-item>
                    <el-form-item label="password">
                        <el-input v-model="userCreds.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="onSignup">Signup</el-button>
                        <el-button type="danger" plain @click="hide">Cancel</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
import { userService } from '../services/user.service';

export default {
    data() {
        return {
            activeTab: 'login',
            userCreds: {
                fullname: '',
                username: '',
                password: '',
            },
        };
    },
    computed: {
        isSignup() {
            return this.activeTab === 'signup';
        },
    },
    methods: {
        selectTab(tab) {
            this.activeTab = tab;
        },
        hide() {
            this.$emit('hide');
        },
        onSignup() {
            console.log('signup');
            userService.signup(this.userCreds);
            this.$emit('login-signup', true);
            this.userCreds = {
                fullname: '',
                username: '',
                password: '',
            };
            this.$store.commit({ type: 'setLoggedinUser' });
        },
        onLogin() {
            console.log('login');
            userService
                .login(this.userCreds)
                .then((res) => console.log(res))
                .catch((err) => console.error(err));
            this.$emit('login-signup', true);
            this.userCreds = {
                fullname: '',
                username: '',
                password: '',
            };
            this.$store.commit({ type: 'setLoggedinUser' });
        },
    },
};
</script>
