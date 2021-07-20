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
      v-model="textarea"
    />
    <el-button type="primary">Primary</el-button>

    <msg-list :updates="updates" />
  </section>
</template>

<script>
import msgList from './msg-list.vue';
export default {
  components: { msgList },
    props:{
        updates:Array
    },
  data() {
    return {
      isEditingState: false,
      textarea: "",
      msg:{
          id:'1235j',
          createdAt:Date.now(),
          txt:'',
          createdBy: {
            _id: 'u101',
            fullname: 'Rachel Bekarov',
            imgUrl: 'http://some-img.jpg',
        },
        isLiked:0
      }
    };
  },
  methods: {
    setToEdit() {
      this.isEditingState = !this.isEditingState;
    },
  },
};
</script>

<style>
</style>