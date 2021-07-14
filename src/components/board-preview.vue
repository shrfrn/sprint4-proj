<template>
    <article @click="loadBoard" class="board-preview">
        {{miniBoard.title}}
    </article>
</template>

<script>
export default {
    props: {
        miniBoard: {
            type: Object,
            required: true,
        }
    },
    methods:{
    }
}
</script>

<style>

</style>