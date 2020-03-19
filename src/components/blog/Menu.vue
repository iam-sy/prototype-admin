<template>
    <div class="menu">
        <router-link to="#lnk" class="menu__button">
            <span>.all</span>
        </router-link>
        <router-link to="#lnk" class="menu__button">
            <span>.review</span>
        </router-link>
        <router-link to="#lnk" class="menu__button">
            <span>.study</span>
        </router-link>
        <div class="menu__line" aria-hidden="true"></div>
    </div>
</template>

<script>
export default {
    porps: {},
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
