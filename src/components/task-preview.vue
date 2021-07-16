<template>
  <section class="task-preview">
    <el-dropdown class="dropdown">
      <el-button size="mini">
        <i class="el-icon-arrow-down el-icon--center"></i>
      </el-button>
      <el-dropdown-menu trigger="click" size="medium" slot="dropdown">
        <el-dropdown-item @click.native="removeTask"
          >Remove task</el-dropdown-item
        >
        <el-dropdown-item @click.native="toggleEdit"
          >Rename title</el-dropdown-item
        >
        <el-dropdown-item @click.native="duplicateTask"
          >Duplicate task</el-dropdown-item
        >
        <el-dropdown-item @click.native="openTaskDetails">Open chat</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div
      class="task-title"
      @mouseover="togglehover(true)"
      @mouseleave="togglehover(false)"
    >
      <template v-if="isEditTitle">
        <form @submit.prevent="updateTask" @change.prevent="togglehover(false)">
          <input
            ref="editTitle"
            type="text"
            @change="togglehover(false)"
            v-model="title"
          />
        </form>
      </template>
      <template v-else>
        <p>{{ task.title }}</p>
        <button @click="toggleEdit" v-if="isHover">edit</button>
      </template>
      <button @click="openTaskDetails">chat</button>
    </div>
    <div class="dinamic">ss</div>
    <div class="dinamic">ss</div>
    <div class="dinamic">ss</div>
    <div class="dinamic">ss</div>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
    groupIdx: Number,
  },
  data() {
    return {
      isEditTitle: false,
      title:this.task.title,
    //   currTask: this.task,
      isHover: false,
    };
  },
  mounted() {
    if (this.$refs.editTitle) this.$refs.editTitle.focus();
  },
  methods: {
    toggleEdit() {
      this.isEditTitle = !this.isEditTitle;
      if (this.$refs.editTitle) this.$refs.editTitle.focus();
    },
    togglehover(isTrue) {
      this.isHover = isTrue;
    },
    openTaskDetails(){
        this.$emit('openTaskDetails',this.task.id)
       
    },
    async updateTask() {
        var taskToUpdate=JSON.parse(JSON.stringify(this.task));
        taskToUpdate.title=this.title
      await this.$store.dispatch({
        type: "updateTask",
        task: taskToUpdate,
        groupIdx: this.groupIdx,
      });
      this.toggleEdit();
    },
    async removeTask() {
      await this.$store.dispatch({
        type: "removeTask",
        task: this.task,
        groupIdx: this.groupIdx,
      });
    },
    async duplicateTask() {
      await this.$store.dispatch({
        type: "duplicateTask",
        task: this.task,
        groupIdx: this.groupIdx,
      });
    },
  },
};
</script>

<style></style>
