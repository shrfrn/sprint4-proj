<template>
    <p>{{this.tags}}</p>
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
            tags: [],
        }
    },
    created(){
        const tags = new Set()
        currGroup.tasks.forEach(task => {
            task.columns['tags'].forEach(tag => tags.add(tag))
        })
        this.tags = tags.entries()
    },
    computed: {
        currGroup(){
            const boardGroups = this.$store.getters.currBoard.groups
            return boardGroups.find(group => group.id === this.groupId)
        }
    }
}
</script>