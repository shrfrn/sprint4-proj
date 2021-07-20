<template>
    <article @click="setBoard(miniBoard._id)" class="board-preview">
        <div class="texts">
            <i class="fas fa-th-list"></i>
            <span v-show="!isEditingState || currEditedBoard != miniBoard._id">{{
                miniBoard.title
            }}</span>
            <input
                class="input"
                :ref="miniBoard._id"
                v-show="isEditingState && currEditedBoard == miniBoard._id"
                @blur="updateBoardName(miniBoard._id)"
                @keydown.enter="updateBoardName()"
                type="text"
                v-model="newTitle"
            />
        </div>

        <el-dropdown trigger="hover">
            <span class="el-dropdown-link">
                <i class="fas fa-ellipsis-h"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="openInNewTab(miniBoard._id)"
                    ><i class="fas fa-external-link-alt"></i> Open in New Tab</el-dropdown-item
                >

                <el-dropdown-item
                    @click.native="setToEdit(miniBoard._id)"
                    icon="el-icon-edit"
                    divided
                    >Rename Board</el-dropdown-item
                >
                <el-dropdown-item
                    @click.native="duplicateBoard(miniBoard._id)"
                    icon="el-icon-document-copy"
                    >Duplicate Board</el-dropdown-item
                >
                <el-dropdown-item
                    @click.native="addToFavorites(miniBoard)"
                    icon="el-icon-star-off"
                    >Add to favorites</el-dropdown-item
                >

                <el-dropdown-item
                    @click.native="deleteBoard(miniBoard._id)"
                    icon="el-icon-delete-solid"
                    divided
                    >Delete</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </article>
</template>

<script>
export default {
    props: {
        miniBoard: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            active: false,
            isContextMenuShown: false,
            newTitle: this.miniBoard.title,
            isEditingState: false,
            currEditedBoard: null,
        };
    },
    methods: {
        setBoard(boardId) {
            if (this.$store.getters.currBoard?._id === boardId) return;
            this.$router.push(`/board/${boardId}`);
        },
        setToEdit(boardId) {
            setTimeout(() => {
                this.$refs[boardId].focus();
            }, 0);
            this.currEditedBoard = boardId;
            this.isEditingState = true;
        },
        updateBoardName(boardId) {
            this.$emit('updateBoardName', this.newTitle, boardId);
            this.isEditingState = false;
            this.currEditedBoard = null;
        },
        openContextMenu() {
            this.active = !this.active;
        },
        showContextMenu() {
            this.isContextMenuShown = true;
            console.log('ok');
        },
        hideContextMenu() {
            this.isContextMenuShown = false;
        },
        showMenu() {
            console.log('showing menu');
        },
        deleteBoard(boardId) {
            this.$emit('deleteBoard', boardId);
        },
        addToFavorites(miniBoard) {
            this.$emit('addToFavorites', miniBoard);
        },
        openInNewTab(boardId) {
            window.open(`http://localhost:8080/boards/${boardId}`, '_blank').focus();
        },
        duplicateBoard(boardId) {
            this.$emit('duplicateBoard', boardId);
        },
    },
};
</script>

<style></style>
