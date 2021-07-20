<template>
    <section class="task-list">
        <draggable
            v-model="tasksCopy"
            ghost-class="ghost"
            group="tasks"
            @end="onEnd"
            @change="test"
            handle=".handle-task"
        >
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

        <div class="summery">
            <component
                :is="column"
                v-for="(column, idx) in summeryComponents"
                :key="idx"
                :group="group"
                :groupId="groupId"
            />
        </div>
    </section>
</template>

<script>
import taskPreview from './task-preview.vue';
import draggable from 'vuedraggable';
import tagsSummery from './tags-summery-column.vue';
import personSummery from './person-summery-column.vue';
import statusSummery from './status-summery-column.vue';
import dateSummery from './date-summery-column.vue';

export default {
    props: { tasks: Array, color: Object, groupId: String, group: Object },
    components: {
        taskPreview,
        draggable,
        tagsSummery,
        personSummery,
        statusSummery,
        dateSummery,
    },

    data() {
        return {
            tasksCopy: null,
            taskToAdd: null,
            summeryComponents: [statusSummery, dateSummery, personSummery, tagsSummery],
        };
    },
    created() {
        // this.taskToAdd = JSON.parse(JSON.stringify(this.$store.getters.getEmptyTask));
        this.taskToAdd = JSON.parse(JSON.stringify(this.$store.getters.getEmptyTask));
        this.tasksCopy = JSON.parse(JSON.stringify(this.tasks));
    },
    watch: {
        tasks(newVal) {
            this.tasksCopy = JSON.parse(JSON.stringify(newVal));
        },
    },
    methods: {
        openTaskDetails(taskId) {
            this.$emit('openTaskDetails', taskId);
        },
        async addTask() {
            if (this.taskToAdd.title === '') return;
            this.taskToAdd.createdAt = Date.now();
            await this.$store.dispatch({
                type: 'addTask',
                task: this.taskToAdd,
                groupId: this.groupId,
            });
            this.taskToAdd = this.$store.getters.getEmptyTask;
        },
        async onEnd() {
            await this.$store.dispatch({
                type: 'saveTasks',
            });
        },
        test(ev) {
            console.log(ev, this.tasksCopy);
        },
    },
};
</script>
