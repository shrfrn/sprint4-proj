<template>
    <section class="board-app">
        <navbar :user="user" @logout="logout" />
        <board-list :boards="boards" />
        <router-view />
    </section>
</template>
<script>
import navbar from '../components/navbar.vue';
import boardList from '../components/board-list.vue';
import { socketService } from '@/services/socket.service.js';
export default {
    created() {
        socketService.setup();
        socketService.on('task-updated', this.updateActivity);
        socketService.on('board-list-updated', this.updateBoards);
    },
    methods: {
        updateActivity(activity) {
            console.log('in updateActivity:\n', activity);
        },
        async updateBoards() {
            await this.$store.dispatch({ type: 'loadBoards' });
        },
        async logout() {
            await this.$store.dispatch({ type: 'logout' });
        },
    },
    computed: {
        boards() {
            return this.$store.getters.boards;
        },
        user() {
            return this.$store.getters.getLoggedinUser;
        },
    },
    // destroyed() {
    //     socketService.emit('left-app', this.board._id)
    // },
    components: {
        navbar,
        boardList,
    },
};
</script>
