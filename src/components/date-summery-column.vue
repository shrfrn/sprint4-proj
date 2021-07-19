<template>
    <section class="date-summery">
        <div>
            <el-tooltip
                class="item"
                effect="light"
                :content="differenceInTime(this.minDate, this.maxDate)"
                placement="top"
            >
                <p>
                    {{ new Date(this.minDate).getDate() }}
                    {{ getMonthForamt(new Date(this.minDate)) }}
                    -
                    {{ new Date(this.maxDate).getDate() }}
                    {{ getMonthForamt(new Date(this.maxDate)) }}
                </p>
            </el-tooltip>
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
            minDate: null,
            maxDate: null,
            isDaysShown: false,
        };
    },
    created() {
        this.isDaysShown = false;
        this.minDate = Infinity;
        this.maxDate = -Infinity;
        console.log('currGroup :>> ', this.currGroup);
        this.currGroup.tasks.forEach((task) => {
            if (task.columns['date'] < this.minDate) this.minDate = task.columns['date'];
            if (task.columns['date'] > this.maxDate) this.maxDate = task.columns['date'];
        });
    },
    computed: {
        currGroup() {
            const boardGroups = this.$store.getters.currBoard.groups;
            return boardGroups.find((group) => group.id === this.groupId);
        },
    },
    methods: {
        getMonthForamt(time) {
            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];
            return months[time.getMonth()];
        },
        differenceInTime(date1, date2) {
            const diff = new Date(date2).getTime() - new Date(date1).getTime();
            return Math.trunc(diff / (1000 * 3600 * 24)) + ' Days';
        },
        showDays() {
            console.log('hi');
            this.isDaysShown = true;
        },
        hideDays() {
            console.log('bye');
            this.isDaysShown = false;
        },
    },
};
</script>
