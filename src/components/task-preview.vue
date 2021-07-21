<template>
    <section class="task-preview">
        <el-dropdown class="dropdown" trigger="click">
            <el-button size="mini">
                <i class="fas fa-caret-square-down icon"></i>
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
        <!-- <div
            class="task-title"
            :class="isEdit"
            @mouseover="togglehover(true)"
            @mouseleave="togglehover(false)"
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
    </el-dropdown> -->
    <div
      class="task-title"
      :class="isEdit"
      @mouseover="togglehover(true)"
      @mouseleave="togglehover(false)"
      @click="openTaskDetails"
    >
      <template v-if="isEditTitle">
      
          <input
            ref="editTitle"
            type="text"
            v-model="currTask.title" 
            @keydown.enter="updateTask"
            @blur="toggleEdit(false)"
           
          />
          <!-- @change="toggleEdit(false)" -->
        
      </template>
      <section class="title-task handle-task" v-else>
        <p>{{ task.title }}</p>
        <button @click.stop="toggleEdit(true)" v-if="isHover">Edit</button>
      </section>
      <!-- <i class="far fa-comments open-chat" @click="openTaskDetails"></i> -->
      <i class="far fa-comment open-chat"></i>
    </div>
    <component
      v-for="column in currBoard.columns"
      :key="column"
      :is="componentType(column)"
      class="dynamic-column"
      @input="updateTask"
      @add-activity="addActivity"
      :board="currBoard"
      v-model="currTask.columns[column]"
    />
  </section>
</template>

<script>
import { columnHelpers } from '@/services/column.helpers.js';
import { utilService } from '@/services/util.service.js';

import personColumn from '@/components/person-column';
import statusColumn from '@/components/status-column';
import dateColumn from '@/components/date-column';
import tagsColumn from '@/components/tags-column';

export default {
    props: {
        task: Object,
        groupId: String,
    },
    data() {
        return {
            // title: this.task.title,
            currTask: '',
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
        isEdit() {
            if (this.isEditTitle) return '';
            else return 'handle-task';
        },
        currBoard() {
            return this.$store.getters.currBoard;
        },
    },
    methods: {
        toggleEdit(isTrue) {
            this.isEditTitle = isTrue;
            if(!isTrue) this.currTask.title=this.task.title
            setTimeout(() => {
                if (this.$refs.editTitle) this.$refs.editTitle.focus();
            }, 0);
            // if (this.$refs.editTitle) this.$refs.editTitle.focus();
        },
        togglehover(isTrue) {
            this.isHover = isTrue;
        },
        openTaskDetails() {
          if(this.isEditTitle===true) return;
            this.$emit('openTaskDetails', this.task.id);
        },
       addActivity(change){
            var msg;
      if (this.isEditTitle === true) {
        msg =
          "edit task name from " +
          this.task.title +
          " to " +
          this.currTask.title;
        this.$store.commit({
          type: "setActivity",
          itemId: this.currTask.id,
          itemName: this.currTask.title,
          typeActivity: "Edit task name",
          msg,
        });
      } else if(change){
          
      
        this.$store.commit({
          type: "setActivity",
          itemId: this.currTask.id,
          itemName: this.currTask.title,
          typeActivity: change.type,
          msg:change.msg,
        });

      }
      
    },
    async updateTask() {
     if (this.isEditTitle === true)  this.addActivity()
  console.log(this.currTask.title);
      await this.$store.dispatch({
        type: "updateTask",
        task: this.currTask,
        groupId: this.groupId,
      });
      this.isEditTitle =false
    },
    async removeTask() {
            console.log('removing');
            await this.$store.dispatch({
                type: 'removeTask',
                task: this.task,
                groupId: this.groupId,
            });
        },
   async duplicateTask() {
            const taskCopy = JSON.parse(JSON.stringify(this.task));
            taskCopy.title = 'Copy of ' + this.task.title;
            taskCopy.id = utilService.makeId();

            await this.$store.dispatch({
                type: 'duplicateTask',
                task: this.task,
                taskCopy,
                groupId: this.groupId,
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
