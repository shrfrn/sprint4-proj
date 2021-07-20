<template>
    <section class="board-list">
        <p class="title">Boards</p>
        <section class="board-list-actions">
            <article class="action" @click="addBoard">
                <i class="fas fa-plus fa-sm"></i>
                <span>Add board</span>
            </article>
            <article class="action" @click="filter">
                <i class="fas fa-filter fa-sm"></i>
                <span>Filter</span>
            </article>
            <article class="action" @click="search">
                <i class="fas fa-search fa-sm"></i>
                <span>Search</span>
            </article>
        </section>

        <section class="board-list-items">
            <board-preview
                v-for="board in boards"
                :key="board._id"
                :miniBoard="board"
                @deleteBoard="deleteBoard"
                @addToFavorites="addToFavorites"
                @duplicateBoard="duplicateBoard"
                @updateBoardName="updateBoardName"
            />
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
            this.$prompt('Please Enter Board Name', 'Add Board', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputPattern: /\w*[a-zA-Z]\w*/,
                inputErrorMessage: 'Invalid Name',
            })
                .then(({ value }) => {
                    const newBoard = boardService.getEmptyBoard();
                    const boardTitle = value;
                    newBoard.title = boardTitle;
                    this.$store.dispatch({ type: 'saveBoard', board: newBoard });
                    this.$message({
                        type: 'success',
                        message: 'Your Board Name is: ' + value,
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Input canceled',
                    });
                });
        },
        updateBoardName(newTitle, boardId) {

            const miniBoards = this.$store.getters.boards
            const miniBoard = miniBoards.find(board => board._id === boardId)
            miniBoard.title = newTitle

            this.$store.dispatch({ type: 'saveMiniBoard', miniBoard })
        },

        deleteBoard(boardId) {
            console.log('boardId :>> ', boardId);
            this.$store.dispatch({ type: 'removeBoard', boardId });
        },

        addToFavorites(miniBoard) {
            miniBoard.isFavorite = !miniBoard.isFavorite
            this.$store.dispatch({ type: 'saveMiniBoard', miniBoard });
        },

        duplicateBoard(boardId) {
            this.$store.dispatch({ type: 'duplicateBoard', boardId });
        },

        filter() {
            this.$message({
                showClose: true,
                duration: 2000,
                message: 'Oops, this feature is not available yet.',
                type: 'error',
            });
            // this.$message.error('Oops, this feature is not available yet.');
        },
        search() {
            this.$message({
                showClose: true,
                duration: 2000,
                message: 'Oops, this feature is not available yet.',
                type: 'error',
            });
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
