<template>
    <section class="board-list">
        <p class="title">Workspaces</p>
        <section class="board-list-actions">
            <article class="action" @click="addBoard">
                <i class="fas fa-plus fa-sm"></i>
                <span>Add board</span>
            </article>
            <article class="action">
                <i class="fas fa-filter fa-sm"></i>
                <span>Filter</span>
            </article>
            <article class="action">
                <i class="fas fa-search fa-sm"></i>
                <span>Search</span>
            </article>
        </section>
        <hr />
        <section class="board-list-items">
            <board-preview v-for="board in boards" :key="board._id" :miniBoard="board" />
        </section>
    </section>
</template>

<script>
import boardPreview from './board-preview.vue';
import { boardService } from '@/services/board.service.js';

export default {
    props: {
        boards: {
            type: Array,
            required: true,
        },
    },
    methods: {
        addBoard() {
            const boardTitle = prompt('Enter board title');
            const newBoard = boardService.getEmptyBoard();
            newBoard.title = boardTitle;
            this.$message({
                message: `Congrats, ${newBoard.title} added successfully.`,
                type: 'success',
            });
            this.$store.dispatch({ type: 'saveBoard', board: newBoard });
        },
    },
    async created() {
        await this.$store.dispatch({ type: 'loadBoards' });
    },
    components: {
        boardPreview,
    },
};
</script>

<style></style>
