<template>
    <section v-if="groups" class="group-list">
        <ul v-for="(group, idx) in groups" :key="group.id">
            <el-dropdown>
                <el-button size="mini">
                    <i class="el-icon-arrow-down el-icon--center"></i>
                </el-button>
                <el-dropdown-menu trigger="click" size="medium" slot="dropdown">
                    <el-dropdown-item @click.native="collapseGroup">
                        Collapse All Groups
                    </el-dropdown-item>

                    <el-dropdown-item @click.native="openGroup">Open All Groups</el-dropdown-item>

                    <el-dropdown-item @click.native="setToEdit(group, group.id)">
                        Rename Group
                    </el-dropdown-item>

                    <el-dropdown-item @click.native="removeGroup(group)">
                        Delete Group
                    </el-dropdown-item>

                    <el-dropdown-item @click.native="duplicateGroup(group)">
                        Duplicate Group
                    </el-dropdown-item>

                    <el-dropdown-item>
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
            <input
                :ref="group.id"
                v-show="isEditingState && currEditedGroup == group.id"
                @blur="updateGroupName(group)"
                @keydown.enter="updateGroupName(group)"
                type="text"
                v-model="group.title"
            />
            <div v-if="!isCollapse">
                <task-list :tasks="group.tasks" :color="group.style" :groupIdx="idx" />
            </div>
        </ul>
    </section>
</template>

<script>
import taskList from './task-list.vue';
export default {
    props: {
        groups: Array,
    },
    data() {
        return {
            groupToEdit: {},
            isCollapse: false,
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
    created() {},
    components: {
        taskList,
    },

    methods: {
        collapseGroup() {
            this.isCollapse = true;
            // console.log('this.isCollapse :>> ', this.isCollapse);
        },
        openGroup() {
            this.isCollapse = false;
            // console.log('this.isCollapse :>> ', this.isCollapse);
        },
        setToEdit(group, groupId) {
            setTimeout(() => {
                this.$refs[groupId][0].focus();
            }, 0);
            // console.log('this.$refs :>> ', this.$refs);
            // this.groupToEdit = JSON.parse(JSON.stringify(group));
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
    },
};
</script>

<style></style>
