<template>
    <!-- <section class="task-details" v-if="currTask">
      <button @click="closeDetails">X</button>
   <h3>{{currTask.title}}</h3>
   
  </section> -->
    <el-drawer :visible.sync="drawer" :title="currTask.title">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Updates" name="Updates">
                <chat-box v-if="updates" :updates="updates" />
            </el-tab-pane>
            <el-tab-pane label="Activity log" name="Activity log">
                <activity-list v-if="activities" :activities="activities" />
            </el-tab-pane>
        </el-tabs>
    </el-drawer>
</template>

<script>
import activityList from '../components/activity-list.vue';
import ChatBox from '../components/chat-box.vue';

export default {
    components: { activityList, ChatBox },
    data() {
        return {
            currTask: null,
            drawer: true,
            activeName: 'Updates',
            activities: [],
            updates: [],
        };
    },
    watch: {
        drawer() {
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
                if (task.id === taskId) this.currTask = task;
            });
        });
        this.activities = this.$store.getters.getActivitiesByItem(taskId);
        console.log(this.activities);
        this.updates = this.$store.getters.getUpdatesByItem(taskId);
        console.log(this.updates);
    },
    methods: {
        closeDetails() {
            this.$router.push(`/board/${this.$route.params.boardId}`);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
};
</script>

<style></style>
