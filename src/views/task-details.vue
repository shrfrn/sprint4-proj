<template>
  <!-- <section class="task-details" v-if="currTask">
      <button @click="closeDetails">X</button>
   <h3>{{currTask.title}}</h3>
   
  </section> -->
  <el-drawer :visible.sync="drawer" :title="currTask.title">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Updates" name="Updates"><chat-box/></el-tab-pane>
      <el-tab-pane label="Activity log" name="Activity log">
        <activity-list v-if="activities" :activities="activities"/>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script>
import activityList from "../components/activity-list.vue";
import ChatBox from '../components/chat-box.vue';
import {boardService} from "../services/board.service.js"
export default {
  components: { activityList, ChatBox },
  data() {
    return {
      currTask: null,
      drawer: true,
      activeName: "Activity log",
      activities: [],
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
    this.activities = boardService.getActivitiesByItem(taskId);
    console.log( this.activities);
  },
  methods: {
    closeDetails() {
      this.$router.push(`/boards/${this.$route.params.boardId}`);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style></style>
