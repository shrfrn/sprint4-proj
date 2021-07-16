<template>
    <section class="person-column" v-if="hasDelegates">
        <span @click="togglePersonPicker" v-for="delegate in newDelegates" :key="delegate._id">
            <avatar :username="delegate.fullname" :inline="true" :size="30" :src="delegate.imgUrl"></avatar>
        </span>
        <person-picker 
            :delegates="value"
            :members="members"
            v-if="this.isPickerOpen" 
            @change="onDelegateListChange"
            @input="onNewDelegateList" />
    </section>
</template>

<script>
import Avatar from 'vue-avatar'

import personPicker from '@/components/person-picker'
export default {
    props: {
        value: {
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
            newDelegates: [],
            isPickerOpen: false,
        }
    },
    created(){
        this.newDelegates = JSON.parse(JSON.stringify(this.value))
    },
    methods: {
        togglePersonPicker(){
            this.isPickerOpen = !this.isPickerOpen
        },
        onNewDelegateList(newDelegates){
            console.log('newDelegates', newDelegates);
            this.$emit('input', newDelegates)
        },
        onDelegateListChange(newDelegates){
            this.newDelegates = newDelegates
        },
    },
    computed: {
        hasDelegates() { return !!this.value.length},
    },
    components: {
        personPicker,
        Avatar,
    },
}
</script>