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
        group: Object,
    },
    data() {
        return {
            minDate: Infinity,
            maxDate: -Infinity,
            isDaysShown: false,
        };
    },
    created() {
        this.loadDates();
    },
    computed: {
        currGroup() {
            const boardGroups = this.$store.getters.currBoard.groups;
            return boardGroups.find((group) => group.id === this.groupId);
        },
    },
    methods: {
        loadDates() {
            this.group.tasks.forEach((task) => {
                if (task.columns['date'] < this.minDate) this.minDate = task.columns['date'];
                if (task.columns['date'] > this.maxDate) this.maxDate = task.columns['date'];
            });
        },
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
    },
    watch: {
        group() {
            this.loadDates();
        },
    },
};
</script>
