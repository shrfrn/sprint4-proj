<template>
  <section class="activity-preview">
    <!-- {{ activity }} -->
  

    <div>{{ activity.itemId }}</div>
    <div>{{ activity.type }}</div>
  
     <div>{{ activity.from.info }}</div>
      <div>{{ activity.to.info }}</div>
  </section>
</template>

<script> 

export default {
   
  props: {
    activity: Object,
  },
  methods: {
 
  },
    components: {
    
    },
};
</script>
