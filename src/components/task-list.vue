<template>
    <section class="task-list">
        <draggable v-model="tasksCopy" ghost-class="ghost" group="tasks" @end="onEnd"  handle=".handle-task">
            <transition-group type="transition" name="flip-list">
                <task-preview
                    class="style-task sortable"
                    :style="{ borderColor: color.color }"
                    v-for="(task, idx) in tasksCopy"
                    :key="idx"
                    :task="task"
                    :groupId="groupId"
                    @openTaskDetails="openTaskDetails"
                />
            </transition-group>
        </draggable>
        <form @submit.prevent="addTask">
            <input
                class="style-task add-input"
                :style="{ borderColor: color.color }"
                type="text"
                placeholder="+ Add"
                v-model="taskToAdd.title"
            />
        </form>
    </section>
</template>

<script>
import taskPreview from './task-preview.vue';
import draggable from 'vuedraggable';
export default {
    props: { tasks: Array, color: Object, groupId: String },
    components: { taskPreview, draggable },

    data() {
        return {
            tasksCopy: null,
            taskToAdd: null,
        };
    },
    created() {
        // this.taskToAdd = JSON.parse(JSON.stringify(this.$store.getters.getEmptyTask));
        this.taskToAdd = JSON.parse(JSON.stringify(this.$store.getters.getEmptyTask));
        this.tasksCopy = JSON.parse(JSON.stringify(this.tasks));
    },
    watch: {
        tasks(newVal) {
            // console.log('in tasks watcher newVal:', newVal);
            // console.log('in tasks watcher this.tasksCopy:', this.tasksCopy);
            this.tasksCopy = JSON.parse(JSON.stringify(newVal));
        },
    },
    methods: {
        openTaskDetails(taskId) {
            this.$emit('openTaskDetails', taskId);
        },
        async addTask() {
            if (this.taskToAdd.title === '') return;

            // var ToAdd = JSON.parse(JSON.stringify(this.taskToAdd));
            this.taskToAdd.createdAt = Date.now();
            await this.$store.dispatch({
                type: 'addTask',
                task: this.taskToAdd,
                groupId: this.groupId,
            });
            console.log('tasks', this.tasksCopy);
            this.taskToAdd = this.$store.getters.getEmptyTask
        },
        async onEnd() {
            // this.tasks = this.tasksCopy;
            
            await this.$store.dispatch({
                type: 'saveTasks',
               
            });
        },
    },
};
</script>
