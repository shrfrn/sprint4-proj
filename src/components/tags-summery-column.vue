<template>
    <section class="tag-summery" v-if="tags">
        <div v-for="(tag, idx) in tags" :key="idx">#{{ tag }}</div>
    </section>
</template>

<script>
export default {
    props: {
        groupId: {
            type: String,
            required: true,
        },
    },
    date() {
        return {
            tags: [],
        };
    },
    created() {
        const allTags = [];
        this.currGroup.tasks.forEach((task) => {
            task.columns['tags'].forEach((tag) => allTags.push(tag));
        });
        this.tags = [...new Set(allTags)];
    },
    computed: {
        currGroup() {
            const boardGroups = this.$store.getters.currBoard.groups;
            console.log('enter');
            const group = boardGroups.find((group) => group.id === this.groupId);
            console.log('group :>> ', group);
            return boardGroups.find((group) => group.id === this.groupId);
        },
    },
};
</script>
