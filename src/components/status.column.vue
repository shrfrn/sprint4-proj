<template>
    <section class="status-column" v-if="hasStatus">
        <span :style="statusColor">{{newStatus.txt}}</span>
    </section>
</template>

<script>
export default {
    props: {
        status: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            newStatus: { txt: '', color: '#ffffff'},
        }
    },
    computed: {
        hasStatus() { return !!this.status},
        statusColor(){ 
            return {'background-color': this.newStatus.color}
        },
    },
    methods: {
        onStatusChange(){
            this.$emit('task-status-change', this.newStatus)
        }
    },
    created(){
        this.newStatus = JSON.parse(JSON.stringify(this.status)) 
        console.log(this.newStatus);
    },
}
</script>