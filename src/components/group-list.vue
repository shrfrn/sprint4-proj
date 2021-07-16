<template>
    <section v-if="groups" class="group-list">
        <draggable v-model="groupsCopy" ghost-class="ghost" @start="onStart" @end="onEnd">
            <transition-group type="transition" name="flip-list">
                <ul class="sortable" v-for="(group, idx) in groupsCopy" :key="group.id">
                    <div class="group-details">
                        <el-dropdown>
                            <el-button size="mini">
                                <i class="el-icon-arrow-down el-icon--center"></i>
                            </el-button>
                            <el-dropdown-menu trigger="click" size="medium" slot="dropdown">
                                <el-dropdown-item @click.native="collapseSingleGroup(group.id)">
                                  <i class="fas fa-compress-alt"></i>  Collapse this group
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="openSingleGroup(group.id)">
                                <i class="fas fa-expand-alt"></i>  Open this group
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="collapseGroups">
                                   <i class="fas fa-compress-alt"></i>  Collapse All Groups
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="openGroups">
                                   <i class="fas fa-expand-alt"></i>  Open All Groups
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="setToEdit(group, group.id)">
                                  <i class="fas fa-pen"></i>  Rename Group
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="removeGroup(group)">
                                  <i class="far fa-trash-alt"></i>  Delete Group
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="duplicateGroup(group)">
                                  <i class="far fa-copy"></i>  Duplicate Group
                                </el-dropdown-item>
                                <el-dropdown-item class="color-change">
                                  <i class="fas fa-palette"></i> change color
                                    <el-color-picker
                                        @change="changeColor(group)"
                                        v-model="group.style.color"
                                        show-alpha
                                        :predefine="predefineColors"
                                    >
                                    </el-color-picker>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                        <li
                            :style="{ color: group.style.color }"
                            @click="setToEdit(group, group.id)"
                            v-show="!isEditingState || currEditedGroup != group.id"
                        >
                            {{ group.title }}
                        </li>
                        <input class="input"
                            :ref="group.id"
                            v-show="isEditingState && currEditedGroup == group.id"
                            @blur="updateGroupName(group)"
                            @keydown.enter="updateGroupName(group)"
                            type="text"
                            v-model="group.title"
                        />
                    </div>
                    <template v-if="!isAllCollapse && !collapsedGroups.includes(group.id)">
                        <task-list
                            :tasks="group.tasks"
                            :color="group.style"
                            :groupIdx="idx"
                            @openTaskDetails="openTaskDetails"
                        />
                    </template>
                </ul>
            </transition-group>
        </draggable>
    </section>
</template>

<script>
import taskList from './task-list.vue';
import draggable from 'vuedraggable';

export default {
    props: {
        groups: Array,
    },

    data() {
        return {
            isAllCollapse: false,
            groupsCopy: null,
            collapsedGroups: [],
            isGroupCollapse: null,
            isEditingState: false,
            currEditedGroup: null,
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'hsv(51, 100, 98)',
                'hsva(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577',
            ],
        };
    },

    created() {
        this.groupsCopy = JSON.parse(JSON.stringify(this.groups));
    },

    watch: {
        groups(newVal) {
            this.groupsCopy = JSON.parse(JSON.stringify(newVal));
        },
    },
    components: {
        taskList,
        draggable,
    },

    methods: {
        onStart() {
            this.isAllCollapse = true;
        },
        onEnd() {
            this.$emit('updateDrag', this.groupsCopy);
            this.isAllCollapse = false;
        },
        collapseSingleGroup(groupId) {
            this.collapsedGroups.push(groupId);
        },
        openSingleGroup(groupId) {
            this.isAllCollapse = false;
            const idx = this.collapsedGroups.findIndex((id) => id === groupId);
            this.collapsedGroups.splice(idx, 1);
        },
        collapseGroups() {
            this.collapsedGroups = this.groups.map((gp) => gp.id);
            this.isAllCollapse = true;
        },
        openGroups() {
            this.isAllCollapse = false;
            this.collapsedGroups = [];
        },
        setToEdit(group, groupId) {
            setTimeout(() => {
                this.$refs[groupId][0].focus();
            }, 0);
            this.currEditedGroup = group.id;
            this.isEditingState = true;
        },
        updateGroupName(group) {
            this.$emit('updateGroupName', group);
            this.isEditingState = false;
            this.currEditedGroup = null;
        },
        removeGroup(group) {
            this.$emit('removeGroup', group);
        },
        duplicateGroup(group) {
            const duplicatedGroup = JSON.parse(JSON.stringify(group));
            this.$emit('duplicateGroup', duplicatedGroup);
        },
        changeColor(group) {
            this.$emit('changeColor', group);
        },
        openTaskDetails(taskId) {
            this.$emit('openTaskDetails', taskId);
        },
    },
};
</script>
