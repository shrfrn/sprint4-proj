<template>
  <section class="task-list">
    <draggable
      v-model="TasksCopy"
      ghost-class="ghost"
      @end="onEnd"
    >
      <transition-group type="transition" name="flip-list">
        <task-preview
          class="style-task"
          :style="{ borderColor: color.color }"
          v-for="(task, idx) in tasks"
          :key="idx"
          :task="task"
          :groupIdx="groupIdx"
          @openTaskDetails="openTaskDetails"
        />
      </transition-group>
    </draggable>
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
import taskPreview from "./task-preview.vue";
import { utilService } from "../services/util.service";
import draggable from 'vuedraggable';
export default {
  props: { tasks: Array, color: Object, groupIdx: Number },
  components: { taskPreview, draggable, },

  data() {
    return {
      TasksCopy:null,
      taskToAdd: {
        id: utilService.makeId(),
        title: "",
        createdAt: null,
        columns: {
          delegates: [],
          status: {},
          date: 0,
        },
      },
    };
  },
  created() {
        this.TasksCopy = JSON.parse(JSON.stringify(this.tasks));
    },
       watch: {
        tasks(newVal) {
             this.TasksCopy = JSON.parse(JSON.stringify(newVal));
        },
    },
  methods: {
    openTaskDetails(taskId) {
      this.$emit("openTaskDetails", taskId);
    },
    async addTask() {
      if (this.taskToAdd.title === "") return;
      var ToAdd = JSON.parse(JSON.stringify(this.taskToAdd))
      ToAdd.createdAt = Date.now()
      await this.$store.dispatch({
        type: "addTask",
        task: ToAdd,
        groupIdx: this.groupIdx,
      });
      console.log("tasks", this.tasks);
      this.taskToAdd.title = ""
    },
    async onEnd() {
        this.tasks = this.TasksCopy
        await this.$store.dispatch({ type: 'saveTasks', saveTasks:this.TasksCopy,groupIdx: this.groupIdx, });
          
    },
  },
};
</script>

<style></style>
