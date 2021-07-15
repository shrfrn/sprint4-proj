<template>
  <section class="task-details">
    TASK DETAILS
    <button @click="closeDetails">X</button>
  </section>
</template>

<script>
export default {
  created() {},
  methods: {
    closeDetails() {
      this.$router.push(`/boards/${this.$route.params.boardId}`);
    },
  },
};
</script>

<style>
</style>