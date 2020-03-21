<template>
    <button type="button" class="search-label" @click="removeHandler">
        <span class="search-label__text">{{ text }}</span>
    </button>
</template>

<script>
export default {
    props: ['index', 'text'],
    methods: {
        removeHandler() {
            this.$emit('remove', this.index);
        },
    },
};
</script>

<style scoped lang="scss">
.search-label {
    border: none;
    padding: 0;
    margin-left: 10px;
    background-color: $color8;
    border-radius: 15px;
    &__text {
        display: block;
        padding: 5px 9px;
        color: #fff;
        font-size: 13px;
    }
}
</style>
