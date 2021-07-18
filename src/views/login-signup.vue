<template>
    <!-- <div style="margin: 20px;"></div>  -->
    <section>

        <!-- Tabs: select login or signup -->
        <el-tabs v-model="activeTab" @tab-click="selectTab">
            <el-tab-pane label="login" name="login">login</el-tab-pane>
            <el-tab-pane label="signup" name="signup">signup</el-tab-pane>
        </el-tabs>

        <!-- Signup form -->
        <el-form v-if="isSignup" :label-position="left" label-width="100px" :model="userCreds">
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
                <el-button type="primary" @click="onSignup">Signup</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>

        <!-- Login form -->
        <el-form v-else :label-position="left" label-width="100px" :model="userCreds">
            <el-form-item label="username">
                <el-input v-model="userCreds.username"></el-input>
            </el-form-item>
            <el-form-item label="password">
                <el-input v-model="userCreds.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onLogin">Login</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>

    </section>
</template>
<script>

import userService from '@/src/services/user-service.js'

export default {

    data() {
        return {
            activeTab: 'login',
            userCreds: {
                fullname: '',
                username: '',
                password: '',
            }
        }
    },
    computed: {
        isSignup() { return this.activeTab === 'signup' }
    },
    methods: {
        selectTab(tab){
            this.activeTab = tab
        },
        onSignup(){
            console.log('signup')
            userService.signup(this.userCreds)
        },
        onLogin(){
            console.log('login')
            userService.login(this.userCreds)
        },
    },
}
</script>