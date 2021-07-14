<template>
<section class="board-list">
    <section class="board-list-actions">
        <article>Add board</article>
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
export default {
    props: {
        boards: {
            type: Array,
            required: true,
        },
    },
    async created() {
        await this.$store.dispatch({type: 'loadBoards'})
        console.log('boards loaded', this.$store.getters.boards)
    },
    components: {
        boardPreview,
    }
}
</script>

<style>

</style>