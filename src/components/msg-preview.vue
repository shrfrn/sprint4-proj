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
    <div v-if="update.likedBy.length" class="liked-by">
       
        <avatar
          v-for="user in update.likedBy"
          :key="user.id"
          class="person-preview-avatar"
          :username="user.fullname"
          :inline="true"
          :size="20"
        /> Liked
      </div>
    <div class="msg-footer"><button><i class="far fa-thumbs-up  "></i> Like</button> <button> <i class="fas fa-reply  "></i> Reply</button></div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  props: {
    update: Object,
  },
  components: { Avatar },
};
</script>

<style>
</style>