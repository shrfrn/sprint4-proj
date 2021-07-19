<template>
    <section class="status-summery" v-if="statuses">
        <div class="battery">
            <div
                class="stuck"
                :style="{
                    width: percentOfTotal(statuses['Stuck']) + '%',
                    backgroundColor: 'rgb(232, 105, 125)',
                }"
            ></div>
            <div
                class="done"
                :style="{
                    width: percentOfTotal(statuses['Done']) + '%',
                    backgroundColor: 'rgb(51, 211, 145)',
                }"
            ></div>
            <div
                class="in-progress"
                :style="{
                    width: percentOfTotal(statuses['In progress']) + '%',
                    backgroundColor: 'rgb(253, 188, 100)',
                }"
            ></div>
        </div>
    </section>
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
            taskCount: null,
            statuses: null,
        };
    },
    created() {
        this.statuses = {};
        this.taskCount = 0;
        this.currGroup.tasks.forEach((task) => {
            const currStatus = task.columns.status.txt;
            if (this.statuses[currStatus]) {
                this.statuses[currStatus] += 1;
            } else {
                this.statuses[currStatus] = 1;
            }
            // if (!this.statuses[currStatus]) this.statuses[currStatus] = 1;
            // else this.statuses[currStatus] += 1;
            // console.log('this.statuses :>> ', this.statuses);
            this.taskCount++;
            console.log('this.taskCount :>> ', this.taskCount);
        });
    },
    computed: {
        currGroup() {
            const boardGroups = this.$store.getters.currBoard.groups;
            return boardGroups.find((group) => group.id === this.groupId);
        },
    },
    methods: {
        percentOfTotal(status) {
            console.log('status :>> ', status);
            const res = (status / this.taskCount) * 100;
            console.log('res :>> ', res);
            return (status / this.taskCount) * 100;
        },
    },
};
</script>
