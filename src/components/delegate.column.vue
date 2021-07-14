<template>
    <section v-if="hasDelegates">
        <span v-for="delegate in delegates" :key="delegate">{{delegate}}</span>
    </section>
</template>

<script>
export default {
    props: {
        delegates: {
            type: Array,
            required: true,
        }
    },
    computed: {
        hasDelegates() { return !!this.delegates.length},
    },
}
</script>