<template>
    <article
        @contextmenu.prevent="openContextMenu"
        @click="setBoard(miniBoard._id)"
        class="board-preview"
    >
        <i class="fas fa-th-list"></i>
        <span>{{ miniBoard.title }}</span>
        <context-menu v-if="active" :class="{ active }"></context-menu>
    </article>
</template>

<script>
import ContextMenu from './context-menu.vue';
export default {
    // src\components\context-menu.vue
    props: {
        miniBoard: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            active: false,
        };
    },
    methods: {
        setBoard(boardId) {
            if (this.$store.getters.currBoard?._id === boardId) return;
            this.$router.push(`/boards/${boardId}`);
        },
        openContextMenu() {
            this.active = !this.active;
        },
    },
    components: {
        ContextMenu,
    },
};
</script>

<style></style>
