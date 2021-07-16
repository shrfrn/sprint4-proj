<template>
    <article @click="setBoard(miniBoard._id)" class="board-preview">
        <i class="fas fa-th-list"></i>
        <span>{{ miniBoard.title }}</span>
    </article>
</template>

<script>
export default {
    props: {
        miniBoard: {
            type: Object,
            required: true,
        },
    },
    methods: {
        setBoard(boardId) {
            if (this.$store.getters.currBoard?._id === boardId) return;
            this.$router.push(`/boards/${boardId}`);
        },
    },
};
</script>

<style></style>
