<template>
  <section v-if="board" class="board-details">
    <board-header :board="board" />
    <task-list :tasks="board.groups[1].tasks" :color="board.groups[1].style" :groupIdx="idx"/>
    <!-- <board-views :board="board" /> -->
    <!-- <router-link to="/boards/123/task/456">task</router-link> -->
    <router-view />
  </section>
</template>

<script>
// import { boardService } from '../services/board.service';
import boardHeader from "../components/board-header.vue";
import TaskList from "../components/task-list.vue";
// import boardViews from '../components/board-views.vue';

export default {
  data() {
    return {
      board: null,
      idx:1
    };
  },

  created() {
    console.log("CREATING");
    this.loadBoard();
  },
  watch: {
    "$route.params.boardId": {
      immediate: true,
      handler() {
        this.loadBoard();
      },
    },
  },

  components: {
    boardHeader,
    TaskList,
    // boardViews,
  },

  methods: {
    async loadBoard() {
      try {
        const { boardId } = this.$route.params;
        await this.$store.dispatch({ type: "loadBoard", boardId });
        this.board = this.$store.getters.currBoard;
      } catch (error) {
        console.log("Couldnt load board");
      }
    },
  },
};
</script>

<style></style>
