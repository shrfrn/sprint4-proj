<template>
    <p>{{this.minDate}}-{{this.maxDate}}</p>
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
            minDate: Infinity,
            maxDate: -Infinity,
        }
    },
    created(){
        currGroup.tasks.forEach(task => {
            if(task.columns['date'] < this.minDate) this.minDate = task.columns['date']
            if(task.columns['date'] > this.maxDate) this.maxDate = task.columns['date']
        })
    },
    computed: {
        currGroup(){
            const boardGroups = this.$store.getters.currBoard.groups
            return boardGroups.find(group => group.id === this.groupId)
        },
    },
}
</script>