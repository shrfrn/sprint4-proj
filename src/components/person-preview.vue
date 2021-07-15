<template>
    <article class="person-preview" @click="onSelected">
        <avatar class="person-preview-avatar"
                :username="person.fullname" 
                :inline="true"
                :size="30"
                :src="person.imgUrl"/>
        <span class="person-preview-fullname">{{person.fullname}}</span>
    </article>
</template>

<script>
import Avatar from 'vue-avatar'
export default {

    props: {
        person: {
            type: Object,
            required: true
        },
    },
    methods: {
        onSelected(){
            this.$emit('item-selected', this.person._id)
        }
    },
    components: {
        Avatar,
    },
}
</script>

<style>

</style>