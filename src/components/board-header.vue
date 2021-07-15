<template>
    <section class="board-header">
        <div class="board-info">
            <div class="board-title">
                <div class="main-title">
                    <h2
                        @click="setToEdit('title')"
                        v-show="!isEditingState || currEditedTag != 'title'"
                    >
                        {{ board.title }}
                    </h2>
                    <el-input
                        ref="title"
                        v-show="isEditingState && currEditedTag == 'title'"
                        @blur="updateTag"
                        @keydown.enter="updateTag"
                        type="text"
                        v-model="board.title"
                        value="value"
                    />
                    <el-button
                        icon="el-icon-view"
                        circle
                        @click.native="toggleDescription"
                    ></el-button>
                </div>

                <div class="sub-title" v-if="isDecriptionShown">
                    <p
                        @click="setToEdit('description')"
                        v-show="!isEditingState || currEditedTag != 'description'"
                    >
                        {{ board.description }}
                    </p>
                    <el-input
                        ref="description"
                        @blur="updateTag"
                        @keydown.enter.native="updateTag"
                        v-show="isEditingState && currEditedTag === 'description'"
                        type="textarea"
                        :rows="2"
                        v-model="board.description"
                        value="value"
                    >
                    </el-input>
                </div>
            </div>

            <div class="members">
                <span class="avatar" v-for="member in board.members" :key="member._id">
                    <avatar :src="member.imgUrl" :username="member.fullname"></avatar>
                </span>
            </div>
        </div>

        <div class="board-actions">
            <!-- <div class="board-filter"> -->
            <el-button type="primary" size="medium" plain @click.native="addGroup">
                New Group
            </el-button>
            <el-button type="primary" icon="el-icon-search">Search</el-button>

            <!-- PERSON -->
            <el-dropdown>
                <el-button type="primary"> <i class="el-icon-s-custom"></i> Person </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="member in board.members" :key="member._id">{{
                        member.fullname
                    }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <!-- FILTER -->
            <el-dropdown>
                <el-button type="primary"> <i class="el-icon-sort"></i> Filter </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item value="all">All</el-dropdown-item>
                    <el-dropdown-item value="status">Status</el-dropdown-item>
                    <el-dropdown-item value="priority">Priority</el-dropdown-item>
                    <el-dropdown-item value="person">Person</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- </div> -->
    </section>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
    props: {
        board: Object,
    },
    data() {
        return {
            isEditingState: false,
            currEditedTag: null,
            isDecriptionShown: true,
        };
    },

    created() {},
    computed: {},
    methods: {
        setToEdit(tag) {
            this.isEditingState = true;
            this.currEditedTag = tag;
            setTimeout(() => {
                this.$refs[tag].focus();
            }, 10);
        },
        updateTag() {
            this.isEditingState = false;
            this.currEditedTag = null;
        },
        toggleDescription() {
            this.isDecriptionShown = !this.isDecriptionShown;
        },
        addGroup() {
            console.log('Adding');
            this.$emit('addNewGroup');
        },
    },
    components: {
        Avatar,
    },
};
</script>

<style></style>
