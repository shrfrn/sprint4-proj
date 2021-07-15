<template>
    <section class="status-column" v-if="hasStatus">
        <span @click="toggleStatusPicker" :style="statusColor">{{value.txt}}</span>
        <status-picker @input="onSelectStatus" v-if="this.isPickerOpen" v-model="value" class="status-picker" />
    </section>
</template>

<script>
import statusPicker from '@/components/status-picker'
export default {
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            newStatus: { txt: '', color: '#ffffff'},
            isPickerOpen: false,
        }
    },
    computed: {
        hasStatus() { return !!this.value},
        statusColor(){ 
            console.log('in statusColor');
            return {'background-color': this.newStatus.color}
        },
    },
    methods: {
        onStatusChange(){
            this.$emit('input', this.newStatus)
        },
        toggleStatusPicker(){
            this.isPickerOpen = !this.isPickerOpen
        },
        onSelectStatus(value){
            // this.value = value
            this.toggleStatusPicker()
            this.$emit('input', value)
            console.log('status:', value);
        },
    },
    created(){
        this.newStatus = JSON.parse(JSON.stringify(this.value)) 
        console.log(this.value);
    },
    components: {
        statusPicker,
    }
}
</script>