<template>
    <header class="nav">
        <div class="nav__logo">
            <router-link to="/blog/list">
                <img src="@/assets/logo.svg" alt="" />
            </router-link>
            <h1>.logs</h1>
        </div>
        <div class="nav__aside">
            <globalMenu></globalMenu>
        </div>
    </header>
</template>

<script>
import globalMenu from '@/components/layout/globalMenu.vue';
export default {
    name: 'Gnb',
    components: {
        globalMenu,
    },
};
</script>
<style scoped lang="scss">
.nav {
    padding: 40px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__logo {
        display: table;
        position: relative;
        a {
            display: inline-block;
            &:not(:first-child) {
                margin-left: 15px;
            }
        }
        img {
            height: 45px;
        }
        h1 {
            position: absolute;
            left: 45px;
            top: 15px;
            font-weight: 400;
            font-size: 30px;
            color: $color1;
        }
    }
    &__aside {
        display: table;
        font-size: 0;
    }
    &__search,
    &__title {
        display: inline-block;
    }
}
</style>
