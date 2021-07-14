<template>
    <article class="board-preview">
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
    }
}
</script>

<style>

</style>