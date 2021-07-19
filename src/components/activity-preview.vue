<template>
  <section class="activity-preview">
    <!-- {{ activity.createdBy.fullname }}
  -->

    <el-card shadow="hover" class="activity-card">
         <avatar
            class="person-preview-avatar"
            :username="activity.createdBy.fullname"
            :inline="true"
            :size="30"
            :src="activity.createdBy.imgUrl"
        />
      <span>{{ activity.msg }}</span>
    </el-card>
  </section>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
  props: {
    activity: Object,
  },
  methods: {},
  components: {Avatar},
};
</script>
