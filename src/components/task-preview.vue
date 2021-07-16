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
            v-model="currTask.title"
          />
        </form>
      </template>
      <template v-else>
        <p>{{ task.title }}</p>
        <button @click="toggleEdit" v-if="isHover">edit</button>
      </template>
      <button @click="openTaskDetails">chat</button>
    </div>
    <person-column class="dynamic-column" @input="updateTask" v-model="currTask.columns['delegates']" :members="boardMembers"></person-column>
    <status-column class="dynamic-column" @input="updateTask" v-model="currTask.columns['status']" ></status-column>
    <div class="dynamic-column">ss</div>
    <div class="dynamic-column">ss</div>
  </section>
</template>

<script>
import personColumn from '@/components/person-column'
import statusColumn from '@/components/status-column'
export default {
  props: {
    task: Object,
    groupIdx: Number,
  },
  data() {
    return {
        title: this.task.title,
        currTask: this.task,
        isHover: false,
        isEditTitle: false,
    }
  },
  created(){
      this.currTask = JSON.parse(JSON.stringify(this.task))
      console.log('currTask', this.currTask);
  },
  mounted() {
    if (this.$refs.editTitle) this.$refs.editTitle.focus();
  },
  
  watch: {
      task(newVal) {
        this.currTask = JSON.parse(JSON.stringify(newVal));
      },
  },

  computed:{
      boardMembers(){
          return this.$store.getters.currBoard.members
      }
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
        await this.$store.dispatch({
            type: "updateTask",
            task: this.currTask,
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
  components: {
      personColumn,
      statusColumn,
  },
};
</script>

<style></style>
