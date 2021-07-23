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
        console.log('this.$store.getters.currBoard :>> ', this.$store.getters.currBoard);
    },
    methods: {
        updateActivity(activity) {
            console.log('in updateActivity:\n', activity);
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
