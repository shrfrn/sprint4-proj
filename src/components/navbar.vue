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
                <router-link to="/board" title="boards">
                    <i class="fas fa-th-large fa-lg"></i>
                </router-link>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="Notifications" placement="right">
                <router-link to="/board" title="notification">
                    <i class="far fa-bell fa-lg"></i>
                </router-link>
            </el-tooltip>
        </section>
        <section class="user-details">Hi Guest</section>

        <section class="user-action">
            <el-tooltip class="item" effect="dark" content="Calender" placement="right">
                <router-link to="/board" title="my week">
                    <i class="far fa-calendar-check fa-lg"></i>
                </router-link>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="My Profile" placement="right">
                <router-link to="/board" title="my profile">
                    <i class="fas fa-user-circle fa-lg"></i>
                </router-link>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="Log Out" placement="right">
                <router-link to="/" title="loguot">
                    <i class="fas fa-sign-out-alt fa-lg"></i>
                </router-link>
            </el-tooltip>
        </section>
    </main>
</template>

<script>
export default {};
</script>

<style></style>
