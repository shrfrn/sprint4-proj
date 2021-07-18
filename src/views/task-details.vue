<template>
    <section class="task-details" v-if="currTask">
        <h3>{{ currTask.title }}</h3>
        <button @click="closeDetails">X</button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            currTask: null,
        };
    },
    created() {
        const board = this.$store.getters.currBoard;
        const taskId = this.$route.params.id;
        board.groups.forEach((group) => {
            return group.tasks.forEach((task) => {
                if (task.id === taskId) this.currTask = task;
            });
        });
    },
    methods: {
        closeDetails() {
            this.$router.push(`/boards/${this.$route.params.boardId}`);
        },
    },
};
</script>

<style></style>
