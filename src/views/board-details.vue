<template>
    <section v-if="board" class="board-details">
        <board-header :board="board" />
        <group-list
            :groups="board.groups"
            @updateGroupName="updateGroupName"
            @removeGroup="removeGroup"
            @duplicateGroup="duplicateGroup"
            @changeColor="changeColor"
        />

        <!-- <board-views :board="board" /> -->
        <!-- <router-link to="/boards/123/task/456">task</router-link> -->
        <router-view />
    </section>
</template>

<script>
// import { boardService } from '../services/board.service';
import boardHeader from '../components/board-header.vue';
import groupList from '../components/group-list.vue';

export default {
    data() {
        return {
            board: null,
        };
    },

    created() {
        this.loadBoard();
    },
    watch: {
        '$route.params.boardId': {
            immediate: true,
            handler() {
                this.loadBoard();
            },
        },
    },

    components: {
        boardHeader,
        groupList,
    },

    methods: {
        async loadBoard() {
            try {
                const { boardId } = this.$route.params;
                await this.$store.dispatch({ type: 'loadBoard', boardId });
                this.board = this.$store.getters.currBoard;
            } catch (error) {
                console.log('Couldnt load board');
            }
        },
        async updateGroupName(updatedGroup) {
            try {
                await this.$store.dispatch({ type: 'updateGroupName', updatedGroup });
            } catch (err) {
                console.log('Couldnt updated the name of the group', err);
            }
        },
        async removeGroup(group) {
            try {
                await this.$store.dispatch({ type: 'removeGroup', group });
                this.loadBoard();
            } catch (err) {
                console.log('Couldnt remove the group', err);
            }
        },
        async duplicateGroup(duplicatedGroup) {
            try {
                await this.$store.dispatch({ type: 'duplicateGroup', duplicatedGroup });
                this.loadBoard();
            } catch (err) {
                console.log('Couldnt duplicate the group', err);
            }
        },
        async changeColor(group) {
            try {
                await this.$store.dispatch({ type: 'updateGroup', group });
                this.loadBoard();
            } catch (err) {
                console.log('Couldnt change the color of the group', err);
            }
        },
    },
};
</script>

<style></style>
