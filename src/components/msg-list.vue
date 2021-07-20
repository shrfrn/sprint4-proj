<template>
<section>

    <msg-preview v-for="(update,idx) in updates" :key="idx" :update="update"/>
</section>
</template>

<script>
import msgPreview from './msg-preview.vue'
export default {
    props:{
        updates:Array
    },
  components: { msgPreview },

}
</script>

<style>

</style>