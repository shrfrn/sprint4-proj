<template>
  <section class="task-preview">
    <el-dropdown class="dropdown">
      <el-button size="mini">
        <i class="el-icon-arrow-down el-icon--center"></i>
      </el-button>
      <el-dropdown-menu trigger="click" size="medium" slot="dropdown">
        <el-dropdown-item @click.native="removeTask"
          ><i class="far fa-trash-alt"></i>Remove task</el-dropdown-item
        >
        <el-dropdown-item @click.native="toggleEdit(true)"
          ><i class="fas fa-pen"></i>Rename title</el-dropdown-item
        >
        <el-dropdown-item @click.native="duplicateTask"
          ><i class="far fa-copy"></i>Duplicate task</el-dropdown-item
        >
        <el-dropdown-item @click.native="openTaskDetails"><i class="fas fa-info" ></i>Open chat</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div
      class="task-title"
      @mouseover="togglehover(true)"
      @mouseleave="togglehover(false)"
    >
      <template v-if="isEditTitle">
        <form @submit.prevent="updateTask" @change.prevent="toggleEdit(false)">
          <input
            ref="editTitle"
            type="text"
            @change="toggleEdit(false)"
            v-model="currTask.title"
          />
        </form>
      </template>
      <section class="title-task" v-else>
        <p>{{ task.title }}</p>
        <button @click="toggleEdit(true)" v-if="isHover">Edit</button>
      </section>
     <i class="far fa-comment open-chat"  @click="openTaskDetails"></i>
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
    toggleEdit(isTrue) {
      this.isEditTitle = isTrue;
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
        this.toggleEdit(false);
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
