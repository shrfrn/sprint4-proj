<template>
    <!-- <section v-if="hasDate"> -->
        <el-date-picker
            v-model="newDate"
            @change="onDateChange"
            type="date"
            size="mini"
            placeholder="Pick a Date"
            format="dd/MM/yyyy"
            value-format="timestamp">
        </el-date-picker>
    <!-- </section> -->
</template>

<script>
export default {
    props: {
        value: {
            // type: Number,
            // required: true,
        },
        board: {
            type: Object,
            required: true,
        },
    },
    data(){
        return {
            newDate: 0,
        }
    },
    computed: {
        hasDate() { 
            return !!this.value
        }
    },
    methods: {
        onDateChange(){
            this.$emit('input', this.newDate)
        },
    },
    created(){
        if(this.value) this.newDate = this.value
    }
}
</script>