<template>
  <section class="task-preview">
    <el-dropdown>
      <el-button size="mini">
        <i class="el-icon-arrow-down el-icon--center"></i>
      </el-button>
      <el-dropdown-menu trigger="click" size="medium" slot="dropdown">
        <el-dropdown-item  @click.native="removeTask">Remove task</el-dropdown-item>
        <el-dropdown-item @click.native="toggleEdit">Rename title</el-dropdown-item>
        <el-dropdown-item>Duplicate task</el-dropdown-item>
        <el-dropdown-item>Open chat</el-dropdown-item>
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
            v-model="currTask.title"
          />
        </form>
      </template>
      <template v-else>
        <p>{{ currTask.title }}</p>
        <button @click="toggleEdit" v-if="isHover">edit</button>
      </template>
      <button>chat</button>
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
      currTask: this.task,
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
    async updateTask() {
      await this.$store.dispatch({
        type: "updateTask",
        task: this.currTask,
        groupIdx: this.groupIdx,
      });
      this.toggleEdit();
    },
    async removeTask(){
      await this.$store.dispatch({
        type: "removeTask",
        task: this.currTask,
        groupIdx: this.groupIdx,
      });
    }
  },
};
</script>

<style>
</style>