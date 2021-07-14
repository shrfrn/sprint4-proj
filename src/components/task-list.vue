<template>
  <section class="task-list">
    <task-preview
      class="style-task"
      :style="styleObject"
      v-for="(task, idx) in tasks"
      :key="idx"
      :task="task"
      :groupIdx="groupIdx"
    />
    <form @submit.prevent="addTask">
      <input
        class="style-task"
        :style="styleObject"
        type="text"
        placeholder="+Add"
        v-model="taskToAdd.title"
      />
    </form>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";
export default {
  props: { tasks: Array, color: Object, groupIdx: Number },
  components: { taskPreview },
  methods:{
    async addTask(){
      if(this.taskToAdd.title==="") return
       await this.$store.dispatch({ type: "addTask", task: this.taskToAdd, groupIdx:this.groupIdx});
       this.taskToAdd.title===""
    }
  },
  data() {
    return {
      taskToAdd: {
        id: "eee",
        title: "",
        createdAt: null,
        columns: {
          delegates: [],
          status: "",
          date: null,
        },
      },
      styleObject: {
        borderColor: this.color.color,
      },
    };
  },
};
</script>

<style>
</style>