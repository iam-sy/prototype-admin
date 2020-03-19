<template>
    <div class="menu">
        <button
            type="button"
            class="menu__button"
            value="all"
            @click="secSelect"
        >
            <span>.all</span>
        </button>
        <button
            type="button"
            class="menu__button"
            value="review"
            @click="secSelect"
        >
            <span>.review</span>
        </button>
        <button
            type="button"
            class="menu__button"
            value="study"
            @click="secSelect"
        >
            <span>.study</span>
        </button>
        <div class="menu__line" aria-hidden="true"></div>
    </div>
</template>

<script>
export default {
    porps: ['sec'],
    methods: {
        secSelect(e) {
            this.$emit('secUpdate', e.currentTarget.value);
        },
    },
};
</script>

<style scoped lang="scss">
.menu {
    display: table;
    &__button {
        display: inline-block;
        line-height: 1.5;
        background: none;
        border: none;
        padding: 0;
        span {
            font-size: 16px;
            display: block;
            padding: 0 6px;
            font-weight: 500;
            color: $color1;
        }
    }
    &__line {
        height: 2px;
        margin-top: 10px;
        background-color: $color1;
    }
}
</style>
