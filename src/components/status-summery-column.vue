<template>
    <p>{{this.statuses}}</p>
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
            taskCount: 0,
            statuses: {},
        }
    },
    created(){
        currGroup.tasks.forEach(task => {
                if(this.statuses[task.columns['status'].txt]) this.statuses[status.txt]++
                else this.statuses[status.txt] = 1
                this.taskCount++
        })
    },
    computed: {
        currGroup(){
            const boardGroups = this.$store.getters.currBoard.groups
            return boardGroups.find(group => group.id === this.groupId)
        },
    },
    methods: {
        percentOfTotal(status){
            return this.statuses[status] / this.taskCount * 100
        }
    }
}
</script>