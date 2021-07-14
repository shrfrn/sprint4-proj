<template>
    <section v-if="hasDate">
        <input @change="onDateChange" v-model="newDate" type="date">
    </section>
</template>

<script>
export default {
    props: {
        date: {
            type: Number,
            required: true,
        }
    },
    data(){
        return {
            newDate: 0,
        }
    },
    computed: {
        hasDate() { 
            console.log(this.date);
            return !!this.date}
    },
    methods: {
        onDateChange(){
            this.$emit('task-date-change', this.newDate)
        },
    },
    created(){
        this.newDate = this.date
    }
}
</script>