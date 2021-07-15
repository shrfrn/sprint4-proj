<template>
    <article>
        <status-item @item-selected="onSelectStatus" :status="status" v-for="status in statuses" :key="status.id" />
    </article>
</template>

<script>
import statusItem from '@/components/status-item'
export default {

    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            statuses: [
                {id: 's001', txt: 'Done', color: '#987987'},
                {id: 's002', txt: 'In progress', color: '#646465'},
                {id: 's003', txt: 'Stuck', color: '#652412'},
            ],

        }
    },
    methods: {
        onSelectStatus(value){
            // this.value = value
            this.$emit('input', value)
            console.log('value onSelect', value);
        },
    },
    components: {
        statusItem,
    },

}
</script>

<style>

</style>