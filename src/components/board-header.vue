<template>
    <section class="board-header">
        <div class="board-info">
            <div class="board-title">
                <div class="main-title">
                    <h2
                        @click="setToEdit('title')"
                        v-show="!isEditingState || currEditedTag !== 'title'"
                    >
                        {{ board.title }}
                    </h2>
                    <input
                        ref="title"
                        v-show="isEditingState && currEditedTag === 'title'"
                        @blur="updateTag"
                        @keydown.enter="updateTag"
                        type="text"
                        v-model="board.title"
                    />
                    <i class="fas fa-info-circle" @click="toggleDescription"></i>
                </div>

                <div class="sub-title" v-if="isDecriptionShown">
                    <p
                        @click="setToEdit('description')"
                        v-show="!isEditingState || currEditedTag !== 'description'"
                    >
                        {{ board.description }}
                    </p>

                    <textarea
                        ref="description"
                        type="textarea"
                        rows="4"
                        cols="50"
                        @blur="updateTag"
                        @keydown.enter="updateTag"
                        v-show="isEditingState && currEditedTag === 'description'"
                        v-model="board.description"
                    />
                </div>
            </div>

            <div class="members">
                <span class="avatar" v-for="member in board.members" :key="member._id">
                    <avatar :size="30" :src="member.imgUrl" :username="member.fullname"></avatar>
                </span>
            </div>
        </div>

        <div class="board-actions">
            <!-- <div class="board-filter"> -->
            <el-button size="small" type="primary" plain @click.native="addGroup">
                New Group
            </el-button>
            <el-input
                size="small"
                @input="setFilter"
                v-model="filterBy.txt"
                placeholder="Search something"
                prefix-icon="el-icon-search"
            ></el-input>

            <!-- PERSON -->
            <el-dropdown>
                <el-button size="small" @click.native="isntAvaliable" type="primary">
                    <i class="el-icon-s-custom"></i> Person
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="member in board.members" :key="member._id">{{
                        member.fullname
                    }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <!-- FILTER -->
            <el-dropdown>
                <el-button size="small" @click.native="isntAvaliable" type="primary">
                    <i class="fas fa-filter"></i> Filter
                </el-button>
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
            filterBy: { txt: '' },
        };
    },

    // created() {},
    // computed: {},
    methods: {
        isntAvaliable() {
            this.$message({
                showClose: true,
                duration: 2000,
                message: 'Oops, this feature is not available yet.',
                type: 'error',
            });
        },
        setToEdit(tag) {
            this.isEditingState = true;
            this.currEditedTag = tag;
            setTimeout(() => {
                this.$refs[tag].focus();
            }, 0);
        },
        updateTag() {
            this.$emit('updateTitles', this.board);
            this.isEditingState = false;
            this.currEditedTag = null;
        },
        toggleDescription() {
            this.isDecriptionShown = !this.isDecriptionShown;
        },
        addGroup() {
            this.$emit('addNewGroup');
        },
        setFilter() {
            this.$emit('setFilter', this.filterBy);
        },
    },
    components: {
        Avatar,
    },
};
</script>

<style></style>
