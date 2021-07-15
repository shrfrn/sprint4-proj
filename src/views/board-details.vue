<template>
    <section v-if="board" class="board-details">
        <board-header :board="board" />
        <task-list :tasks="board.groups[1].tasks" :color="board.groups[1].style" :groupIdx="idx" />
        <!-- <board-views :board="board" /> -->
        <!-- <router-link to="/boards/123/task/456">task</router-link> -->
        <router-view />

        <section v-if="board" class="board-details">
            <board-header :board="board" />
            <group-list
                :groups="board.groups"
                @updateGroupName="updateGroupName"
                @removeGroup="removeGroup"
                @duplicateGroup="duplicateGroup"
                @changeColor="changeColor"
            />

            <!-- <board-views :board="board" /> -->
            <!-- <router-link to="/boards/123/task/456">task</router-link> -->
            <router-view />
            <delegate-column :delegates="delegates" />
            <status-column :status="status" />
            <date-column :date="date" />
        </section>
    </section>
</template>

<script>
// import { boardService } from '../services/board.service';

import boardHeader from '../components/board-header.vue';
import TaskList from '../components/task-list.vue';

import groupList from '../components/group-list.vue';
import delegateColumn from '../components/delegate.column.vue';
import statusColumn from '../components/status.column.vue';
import dateColumn from '../components/date.column.vue';
// import boardViews from '../components/board-views.vue';

export default {
    data() {
        return {
            board: null,
            idx: 1,
        };
    },

    computed: {
        delegates() {
            return this.$store.getters.currBoard.groups[0].tasks[0].columns['delegates'];
        },
        status() {
            console.log(this.$store.getters.currBoard.groups[0].tasks[0].columns['status']);
            return this.$store.getters.currBoard.groups[0].tasks[0].columns['status'];
        },
        date() {
            return this.$store.getters.currBoard.groups[0].tasks[0].columns['date'];
        },
    },
    created() {
        console.log('CREATING');
        this.loadBoard();
    },
    methods: {
        async loadBoard() {
            try {
                const { boardId } = this.$route.params;
                await this.$store.dispatch({ type: 'loadBoard', boardId });
                this.board = this.$store.getters.currBoard;
            } catch (error) {
                console.log('Couldnt load board');
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
                this.loadBoard();
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
                this.loadBoard();
            } catch (err) {
                console.log('Couldnt duplicate the group', err);
            }
        },
        async changeColor(group) {
            try {
                await this.$store.dispatch({ type: 'updateGroup', group });
                this.loadBoard();
            } catch (err) {
                console.log('Couldnt change the color of the group', err);
            }
        },
    },
    watch: {
        '$route.params.boardId': {
            immediate: true,
            handler() {
                debugger;
                this.loadBoard();
            },
        },
    },

    components: {
        boardHeader,
        groupList,
        delegateColumn,
        statusColumn,
        dateColumn,
        TaskList,
        // boardViews,
    },
};
</script>

<style></style>
