<template>
    <section class="status-column" v-if="hasStatus">
        <span @click="toggleStatusPicker" :style="statusColor">{{newStatus.txt}}</span>
        <status-picker @input="onSelectStatus" v-if="this.isPickerOpen" v-model="newStatus" class="status-picker" />
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
        onSelectStatus(){
            this.toggleStatusPicker()
            this.$emit('input', this.newStatus)
        },
    },
    created(){
        this.newStatus = JSON.parse(JSON.stringify(this.value)) 
        console.log('prop:',this.value, 'copy:', this.newStatus);
    },
    components: {
        statusPicker,
    }
}
</script>