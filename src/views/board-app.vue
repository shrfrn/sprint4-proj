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
        socketService.setup()
        socketService.on('task-updated', this.updateActivity)
        
    },
    methods:{

        updateActivity(activity){
            if (this.currTaskId && this.currTaskId === activity.taskId) {
                return console.log('inside task');
            }
            if (this.currBoardId === activity.boardId) return console.log('inside board');

            return console.log('inside app');
        },

        async logout(){
            await this.$store.dispatch({ type: "logout" });
        },
        
    },
    computed: {
        boards() {
            return this.$store.getters.boards;
        },
        user(){
            return this.$store.getters.loggedinUser
        },
        currBoardId(){
            return this.$store.getters.currBoard._id
        },
        currTaskId(){
            return this.$route.params.id
        }
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
