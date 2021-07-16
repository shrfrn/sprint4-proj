<template> 
  <section class="task-details" v-if="currTask">
      <button @click="closeDetails">X</button>
   <h3>{{currTask.title}}</h3>
   
  </section>
</template>

<script>
export default {
    data(){
        return{
            currTask:null
        }
    },
  created() {
        const board=this.$store.getters.currBoard;
        const taskId=this.$route.params.id;
       board.groups.forEach(group=>{
            return group.tasks.forEach(task=>{
                // console.log(task.id);
               if (task.id===taskId)  this.currTask=task;
            })
        })
     
         
  },
  methods: {
    closeDetails() {
      this.$router.push(`/boards/${this.$route.params.boardId}`);
    },
  },
};
</script>

<style>
</style>