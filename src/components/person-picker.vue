<template>
    <section class="person-picker">
        <section class="delegate-list">
            <person-preview @item-selected="onRemoveDelegate" :person="delegate" v-for="delegate in newDelegates" :key="delegate._id" />
        </section>
        <section class="member-list">
            <person-preview @item-selected="onAddDelegate" :person="member" v-for="member in newMembers" :key="member._id" />
        </section>
    </section>
</template>

<script>
import personPreview from '@/components/person-preview'
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
            newDelegates: [],
            newMembers: [],
            isDirty: false,
        }
    },
    created(){
        this.newDelegates = JSON.parse(JSON.stringify(this.delegates))
        console.log('newDelegates', this.newDelegates);
        this.newMembers = this.members.filter(member => {
        return !this.newDelegates.some(delegate => delegate._id === member._id)
        })
        console.log('newMembers', this.newMembers);
    },
    methods: {
        onRemoveDelegate(delegateId){
            const idx = this.newDelegates.findIndex(delegate => delegate._id === delegateId)
            const person = this.newDelegates.splice(idx, 1)[0]
            this.newMembers.unshift(person)
            this.isDirty = true
        },
        onAddDelegate(memberId){
            const idx = this.newMembers.findIndex(member => member._id === memberId)
            const person = this.newMembers.splice(idx, 1)[0]
            this.newDelegates.unshift(person)
            this.isDirty = true
            console.log('person', person);
            console.log('delegates:', this.newDelegates.length);
            console.log('members:', this.members.length);
        },
    },
    beforeDestroy(){
        if(this.isDirty) this.$emit('input', this.delegates)
    },
    components: {
        personPreview,
    },
}
</script>

<style>

</style>