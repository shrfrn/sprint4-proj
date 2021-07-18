<template>
    <section class="task-preview">
        <el-dropdown class="dropdown" trigger="click">
            <el-button size="mini">
                <i class="fas fa-caret-square-down"></i>
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
                <el-dropdown-item @click.native="openTaskDetails">
                    <i class="far fa-comments open-chat" @click="openTaskDetails">
                        Open chat
                    </i>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="task-title" @mouseover="togglehover(true)" @mouseleave="togglehover(false)">
            <template v-if="isEditTitle">
                <form @submit.prevent="updateTask">
                    <input
                        ref="editTitle"
                        type="text"
                        v-model="currTask.title"
                        @blur="toggleEdit(false)"
                    />
                    <!-- @change="toggleEdit(false)" -->
                </form>
            </template>
            <section class="title-task" v-else>
                <p>{{ task.title }}</p>
                <button @click="toggleEdit(true)" v-if="isHover">Edit</button>
            </section>
            <!-- <i class="far fa-comments open-chat" @click="openTaskDetails"></i> -->
            <i class="far fa-comment open-chat" @click="openTaskDetails"></i>
        </div>
        <component
            v-for="column in currBoard.columns"
            :key="column"
            :is="componentType(column)"
            class="dynamic-column"
            @input="updateTask"
            :board="currBoard"
            v-model="currTask.columns[column]"
        />

        <!-- <person-column class="dynamic-column" @input="updateTask" v-model="currTask.columns['delegates']" :members="boardMembers"></person-column>
    <status-column class="dynamic-column" @input="updateTask" v-model="currTask.columns['status']" ></status-column>
    <date-column class="dynamic-column" @input="updateTask" v-model="currTask.columns['date']" ></date-column> -->
        <div class="dynamic-column">ss</div>
        <div class="dynamic-column">ss</div>
    </section>
</template>

<script>
import { columnHelpers } from '@/services/column.helpers.js';
import personColumn from '@/components/person-column';
import statusColumn from '@/components/status-column';
import dateColumn from '@/components/date-column';
import tagsColumn from '@/components/tags-column';
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
        };
    },
    created() {
        this.currTask = JSON.parse(JSON.stringify(this.task));
    },
    mounted() {
        if (this.$refs.editTitle) this.$refs.editTitle.focus();
    },

    watch: {
        task(newVal) {
            this.currTask = JSON.parse(JSON.stringify(newVal));
        },
    },

    computed: {
        boardMembers() {
            return this.$store.getters.currBoard.members;
        },
        currBoard() {
            return this.$store.getters.currBoard;
        },
    },
    methods: {
        toggleEdit(isTrue) {
            this.isEditTitle = isTrue;
            if (this.$refs.editTitle) this.$refs.editTitle.focus();
        },
        togglehover(isTrue) {
            this.isHover = isTrue;
        },
        openTaskDetails() {
            this.$emit('openTaskDetails', this.task.id);
        },
        async updateTask() {
            await this.$store.dispatch({
                type: 'updateTask',
                task: this.currTask,
                groupIdx: this.groupIdx,
            });
            this.toggleEdit(false);
        },
        async removeTask() {
            await this.$store.dispatch({
                type: 'removeTask',
                task: this.task,
                groupIdx: this.groupIdx,
            });
        },
        async duplicateTask() {
            await this.$store.dispatch({
                type: 'duplicateTask',
                task: this.task,
                groupIdx: this.groupIdx,
            });
        },
        componentType(column) {
            return columnHelpers.componentType(column);
        },
    },
    components: {
        personColumn,
        statusColumn,
        dateColumn,
        tagsColumn,
    },
};
</script>

<style></style>
