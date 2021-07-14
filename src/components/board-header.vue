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
                    <input
                        ref="title"
                        v-show="isEditingState && currEditedTag == 'title'"
                        @blur="updateTag"
                        @keydown.enter="updateTag"
                        type="text"
                        v-model="board.title"
                    />
                </div>

                <div class="sub-title">
                    <p
                        @click="setToEdit('description')"
                        v-show="!isEditingState || currEditedTag != 'description'"
                    >
                        {{ board.description }}
                    </p>
                    <input
                        ref="description"
                        @blur="updateTag"
                        @keydown.enter="updateTag"
                        v-show="isEditingState && currEditedTag === 'description'"
                        type="text"
                        v-model="board.description"
                    />
                </div>
            </div>

            <div class="members">
                <ul v-for="member in board.members" :key="member._id">
                    <li>{{ member.fullname }}</li>
                </ul>
            </div>
            <!-- <div class="activities">
                {{ board.activities }}
            </div> -->
        </div>

        <div class="board-actions">
            <!-- <div class="board-layout">
                <select>
                    <option value="board">Board</option>
                </select>
            </div> -->

            <div class="board-filter">
                <button>Add Group</button>
                <input type="search" placeholder="Search" />
                <select name="" id="">
                    Person
                    <option v-for="member in board.members" :key="member._id" value="member">{{
                        member.fullname
                    }}</option>
                </select>
                <select>
                    Filter
                    <option value="all">All</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                    <option value="person">Person</option>
                </select>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        board: Object,
    },
    data() {
        return {
            isEditingState: false,
            currEditedTag: null,
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
            }, 0);
        },
        updateTag() {
            this.isEditingState = false;
            this.currEditedTag = null;
        },
    },
};
</script>

<style></style>
