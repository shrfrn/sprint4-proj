<template>
  <section class="msg-preview">
    <div class="msg-header">
      <avatar
        class="person-preview-avatar"
        :username="update.createdBy.fullname"
        :inline="true"
        :size="40"
      />
      {{ update.createdBy.fullname }}
    </div>
    <div class="msg-body">
      <div class="msg-txt">{{ update.txt }}</div>
    </div>
    <div v-if="like.length" class="liked-by">
        <el-tooltip  v-for="user in like" :key="user._id" class="item" effect="light" :content="user.fullname" placement="top">
      <avatar
       
        
        class="person-preview-avatar"
        :username="user.fullname"
        :inline="true"
        :size="20"
      />
        </el-tooltip>
      Liked
    </div>
    <div class="msg-footer" @click="addLike">
      <button><i class="far fa-thumbs-up"></i> Like</button>
      <button><i class="fas fa-reply"></i> Reply</button>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import { userService } from "../services/user.servic";
export default {
  props: {
    update: Object,
  },
  data() {
    return {
      like: this.update.likedBy,
    };
  },
  components: { Avatar },
  methods: {
    addLike() {
      const user = userService.getLoggedinUser();
      
      this.like.push(user);
      console.log(this.like);
    },
  },
};
</script>

<style>
</style>