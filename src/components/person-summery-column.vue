<template>
    <section v-if="delegates" class="delegate-summery">
        <div v-for="(delegate, idx) in delegates" :key="idx">
            <el-tooltip class="item" effect="light" :content="delegate.fullname" placement="top">
                <avatar
                    :username="delegate.fullname"
                    :inline="true"
                    :size="27"
                    :src="delegate.imgUrl"
                ></avatar>
            </el-tooltip>
        </div>
    </section>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
    props: {
        groupId: {
            type: String,
            required: true,
        },
    },
    date() {
        return {
            delegates: [],
        };
    },
    created() {
        const allDelegates = [];
        this.currGroup.tasks.forEach((task) => {
            task.columns['delegates'].forEach((delegate) => allDelegates.push(delegate));
        });

        this.delegates = allDelegates.filter(
            (dl, idx, self) => idx === self.findIndex((d) => d._id === dl._id)
        );
    },
    computed: {
        currGroup() {
            const boardGroups = this.$store.getters.currBoard.groups;
            return boardGroups.find((group) => group.id === this.groupId);
        },
    },
    components: {
        Avatar,
    },
};
</script>
