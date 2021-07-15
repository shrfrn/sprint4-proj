<template>
    <section class="person-column" v-if="hasDelegates">
        <span @click="togglePersonPicker" v-for="delegate in delegates" :key="delegate._id">
            <avatar :username="delegate.fullname" :inline="true" :size="30" :src="delegate.imgUrl"></avatar>
        </span>
        <person-picker 
            :delegates="delegates"
            :members="members"
            v-if="this.isPickerOpen" 
            @input="onDelegateListChange" />
    </section>
</template>

<script>
import Avatar from 'vue-avatar'

import personPicker from '@/components/person-picker'
export default {
    props: {
        delegates: {
            type: Array,
            required: true,
        },
        members: {
            type: Array,
            required: true,
        },

    },
    data(){
        return {
            isPickerOpen: false,
        }
    },
    methods: {
        togglePersonPicker(){
            this.isPickerOpen = !this.isPickerOpen
        },
        onDelegateListChange(newDelegates){
            this.$emit('input', newDelegates)
        },
    },
    computed: {
        hasDelegates() { return !!this.delegates.length},
    },
    components: {
        personPicker,
        Avatar,
    },
}
</script>