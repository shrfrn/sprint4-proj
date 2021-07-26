<template>
    <main class="navbar">
        <section class="task-action">
            <el-tooltip class="item" effect="dark" content="Homepage" placement="right">
                <router-link to="/" title="logo">
                    <img class="logo-monday" src="~@/assets/img/logo-monday.png" alt="" />
                </router-link>
            </el-tooltip>
            <!-- <router-link to="/" title="logo">
                <img class="logo-monday" src="~@/assets/img/logo-monday.png" alt="" />
            </router-link> -->

            <el-tooltip class="item" effect="dark" content="Boards" placement="right">
                <router-link to="/board/60f7b1e3c66d343ab4f0c567" title="boards">
                    <i class="fas fa-th-large fa-lg"></i>
                </router-link>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="Notifications" placement="right">
                <router-link to="/board/456" title="notification">
                    <i class="far fa-bell fa-lg"></i>
                </router-link>
            </el-tooltip>
        </section>
        <section class="user-details">Hi {{ user.fullname }}</section>

        <section class="user-action">
            <el-tooltip class="item" effect="dark" content="Calender" placement="right">
                <router-link to="/calendar" title="my week">
                    <i class="far fa-calendar-check fa-lg"></i>
                </router-link>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="My Profile" placement="right">
                <router-link to="/profile" title="my profile">
                    <i class="fas fa-user-circle fa-lg"></i>
                </router-link>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="Log Out" placement="right">
                <router-link to="/" title="loguot">
                    <button class="btn-logout" @click="logout">
                        <i class="fas fa-sign-out-alt fa-lg"></i>
                    </button>
                </router-link>
            </el-tooltip>
        </section>
    </main>
</template>

<script>
export default {
    props: {
        user: Object,
    },
    methods: {
        logout() {
            console.log('logout');
            this.$emit('logout');
        },
    },
};
</script>

<style></style>
