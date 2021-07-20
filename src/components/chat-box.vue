<template>
  <section class="chat-box">
    <p @click="setToEdit()" v-show="!isEditingState">write an update</p>
    <textarea
      ref="description"
      type="textarea"
      rows="4"
      cols="50"
      placeholder="write an update"
      v-show="isEditingState"
      v-model="txt"
    />
    <el-button type="primary" @click="saveAction">Primary</el-button>

    <msg-list :updates="updates" />
  </section>
</template>

<script>
import msgList from "./msg-list.vue";
export default {
  components: { msgList },
  props: {
    updates: Array,
  },
  data() {
    return {
      isEditingState: false,
      txt: "",
   
    };
  },
  created() {
 
   
  },
  methods: {
    setToEdit() {
      this.isEditingState = !this.isEditingState;
    },
   async saveAction() {

      await this.$store.dispatch({
        type: "saveUpdate",
        itemId: this.$route.params.id,
        txt: this.txt,
      });
      this.setToEdit();
    },

  },
};
</script>

<style>
</style>