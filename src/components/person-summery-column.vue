<template>
    <p>{{this.delegates}}</p>
</template>

<script>
export default {
    props: {
        groupId: {
            type: String,
            required: true,
        },
    },
    date() {
        return {
            delegates: [],
        }
    },
    created(){
        const delegates = new Set()
        currGroup.tasks.forEach(task => {
            task.columns['delegates'].forEach(delegate => delegates.add(delegate))
        })
        this.delegates = delegates.entries()
    },
    computed: {
        currGroup(){
            const boardGroups = this.$store.getters.currBoard.groups
            return boardGroups.find(group => group.id === this.groupId)
        }
    }
}
</script>