<template>
    <section v-if="board" class="board-details">
        <board-header
            :board="board"
            @addNewGroup="addNewGroup"
            @updateTitles="updateTitles"
            @setFilter="setFilter"
        />
        <group-list
            :groups="board.groups"
            @updateGroupName="updateGroupName"
            @removeGroup="removeGroup"
            @duplicateGroup="duplicateGroup"
            @changeColor="changeColor"
            @updateDrag="updateDrag"
            @openTaskDetails="openTaskDetails"
        />
        <router-view />
    </section>
</template>

<script>
// import { boardService } from '../services/board.service';
import {socketService} from '@/services/socket.service.js'
import boardHeader from '../components/board-header.vue';
import groupList from '../components/group-list.vue';
// import boardViews from '../components/board-views.vue';

export default {
    data() {
        return {
            // idx: 1,
        };
    },

    computed: {
        board() {
            return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
        },
        // delegates: {
        //     get: function() {
        //         const delegates = this.$store.getters.currBoard.groups[0].tasks[0].columns[ 'delegates'];
        //         return JSON.parse(JSON.stringify(delegates));
        //     },
        //     set: function(newVal) {
        //         // this.$store.dispatch({type: updateTask, task, groupId})
        //         console.log('new delegate list:', newVal);
        //     },
        // },
        // members() {
        //     const members = this.$store.getters.currBoard.members;
        //     const names = members.map((member) => member.fullname);
        //     console.log('members:', names);
        //     return this.$store.getters.currBoard.members;
        // },
        // status: {
        //     get: function() {
        //         return this.$store.getters.currBoard.groups[0].tasks[0].columns['status'];
        //     },
        //     set: function(newVal) {
        //         // this.$store.dispatch({type: updateTask, task, groupId})
        //         console.log('new status:', newVal);
        //     },
        // },
        date() {
            return this.$store.getters.currBoard.groups[0].tasks[0].columns['date'];
        },
    },
    async created() {
        console.log('CREATING');
        await this.loadBoard();
        await socketService.setup()
        // console.log('in created. board \n', this.board);
        socketService.emit('in-board', this.board._id)
        socketService.on('board-updated', this.updateBoard )
            
    },
    destroyed(){
        socketService.emit('left-board', this.board._id)
    },

    methods: {
        updateBoard(board){
            console.log('update recieved on socket\n', board);
            this.$store.commit({ type: 'loadBoard', board})
        },
        async loadBoard() {
            try {
                const { boardId } = this.$route.params;
                return await this.$store.dispatch({ type: 'loadBoard', boardId });
                // this.board = this.$store.getters.currBoard;
            } catch (error) {
                console.log('Couldnt load board');
            }
        },
        async updateDrag(updatedGroups) {
            try {
                await this.$store.dispatch({ type: 'saveGroups', updatedGroups });
            } catch (err) {
                console.log('Couldnt updated the order of the groups', err);
            }
        },
        async updateTitles(board) {
            try {
                await this.$store.dispatch({ type: 'saveBoard', board });
            } catch (err) {
                console.log('Couldnt updated the titles', err);
            }
        },

        async addNewGroup() {
            try {
                await this.$store.dispatch({ type: 'addNewGroup' });
            } catch (err) {
                console.log('Couldnt Added the new Group', err);
            }
        },
        async updateGroupName(updatedGroup) {
            try {
                await this.$store.dispatch({ type: 'updateGroupName', updatedGroup });
            } catch (err) {
                console.log('Couldnt updated the name of the group', err);
            }
        },
        async removeGroup(group) {
            try {
                await this.$store.dispatch({ type: 'removeGroup', group });
            } catch (err) {
                console.log('Couldnt remove the group', err);
            }
        },
        async duplicateGroup(duplicatedGroup) {
            try {
                await this.$store.dispatch({
                    type: 'duplicateGroup',
                    duplicatedGroup,
                });
            } catch (err) {
                console.log('Couldnt duplicate the group', err);
            }
        },
        async changeColor(group) {
            try {
                await this.$store.dispatch({ type: 'updateGroup', group });
            } catch (err) {
                console.log('Couldnt change the color of the group', err);
            }
        },
        openTaskDetails(taskId) {
            const board = this.$store.getters.currBoard;
            this.$router.push(`/boards/${board._id}/task/${taskId}`);
        },
        setFilter(filterBy) {
            console.log('filterBy :>> ', filterBy);
            this.$store.dispatch({ type: 'setFilter', filterBy });

            // this.groupsToShow = this.board.groups.filter((group) =>
            //     group.title.includes(filterBy.txt)
            // );
        },
    },
    watch: {
        '$route.params.boardId': {
            immediate: true,
            handler() {
                this.loadBoard();
            },
        },
    },

    components: {
        boardHeader,
        groupList,
    },
};
</script>

<style></style>
