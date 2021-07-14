<template>
    <section v-if="board" class="board-details">
        <board-header :board="board" />

        <!-- <board-views :board="board" /> -->
        <!-- <router-link to="/boards/123/task/456">task</router-link> -->
        <router-view />
        <delegate-column :delegates="delegates" />
        <status-column :status="status" />
        <date-column :date="date" />
    </section>
</template>

<script>
// import { boardService } from '../services/board.service';
import boardHeader from '../components/board-header.vue';
import delegateColumn from '../components/delegate.column.vue';
import statusColumn from '../components/status.column.vue';
import dateColumn from '../components/date.column.vue';
// import boardViews from '../components/board-views.vue';

export default {
    data() {
        return {
            board: null,
        };
    },

    computed: {
        delegates() {
            return this.$store.getters.currBoard.groups[0].tasks[0].columns['delegates']
        },
        status() {
            console.log(this.$store.getters.currBoard.groups[0].tasks[0].columns['status']);
            return this.$store.getters.currBoard.groups[0].tasks[0].columns['status']
        },
        date() {
            return this.$store.getters.currBoard.groups[0].tasks[0].columns['date']
        },
    },

    created() {
        console.log('CREATING');
        this.loadBoard();
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
        delegateColumn,
        statusColumn,
        dateColumn,
        // boardViews,
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
    },
};
</script>

<style></style>
