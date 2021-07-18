<template>
    <!-- <section class="task-details" v-if="currTask">
      <button @click="closeDetails">X</button>
   <h3>{{currTask.title}}</h3>
   
  </section> -->
    <el-drawer :visible.sync="drawer" :closed="closeDetails">
        <span>Hi there!</span>
    </el-drawer>
</template>

<script>
export default {
    data() {
        return {
            currTask: null,
            drawer: true,
        };
    },
    watch: {
        drawer() {
            // console.log(newVal);
            setTimeout(() => {
                this.closeDetails();
            }, 100);

            // this.currTask = JSON.parse(JSON.stringify(newVal));
        },
    },
    created() {
        const board = this.$store.getters.currBoard;
        const taskId = this.$route.params.id;
        board.groups.forEach((group) => {
            return group.tasks.forEach((task) => {
                // console.log(task.id);
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
