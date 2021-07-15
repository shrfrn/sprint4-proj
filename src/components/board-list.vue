<template>
<section class="board-list">
    <section class="board-list-actions">
        <article @click="addBoard">Add board</article>
        <article>Filter</article>
        <article>Search</article>
    </section>
    <hr>
    <section class=board-list-items>
        <board-preview v-for="board in boards" :key="board._id" :miniBoard="board"/>
    </section>
</section>
</template>

<script>
import boardPreview from './board-preview.vue'
import {boardService} from '@/services/board.service.js'

export default {
    props: {
        boards: {
            type: Array,
            required: true,
        },
    },
    methods: {
        addBoard(){
            const boardTitle = prompt('Enter board title')
            const newBoard = boardService.getEmptyBoard()

            newBoard.title = boardTitle
            this.$store.dispatch({type: 'saveBoard', board: newBoard})
        }
    },
    async created() {
        await this.$store.dispatch({type: 'loadBoards'})
    },
    components: {
        boardPreview,
    }
}
</script>

<style>

</style>