<template>
    <section class="task-list">
        <task-preview
            class="style-task"
            :style="{ borderColor: color.color }"
            v-for="(task, idx) in tasks"
            :key="idx"
            :task="task"
            :groupIdx="groupIdx"
            @openTaskDetails="openTaskDetails"
        />
        <form @submit.prevent="addTask">
            <input
                class="style-task"
                :style="{ borderColor: color.color }"
                type="text"
                placeholder="+Add"
                v-model="taskToAdd.title"
            />
        </form>
    </section>
</template>

<script>
import taskPreview from './task-preview.vue';
import { utilService } from '../services/util.service';
export default {
    props: { tasks: Array, color: Object, groupIdx: Number },
    components: { taskPreview },

    data() {
        return {
            taskToAdd: {
                id: utilService.makeId(),
                title: '',
                createdAt: null,
                columns: {
                    delegates: [],
                    status: '',
                    date: null,
                },
            },
        };
    },

  methods: {
    openTaskDetails(taskId){
      this.$emit('openTaskDetails',taskId)
    },
    async addTask() {
      if (this.taskToAdd.title === "") return;
      var ToAdd=JSON.parse(JSON.stringify(this.taskToAdd))
      ToAdd.createdAt = Date.now();
      await this.$store.dispatch({
        type: "addTask",
        task: ToAdd,
        groupIdx: this.groupIdx,
      });
      console.log("tasks", this.tasks);
      this.taskToAdd.title= '';
   
    },
  },
};
</script>

<style></style>
