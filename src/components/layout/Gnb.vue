<template>
    <header class="nav">
        <div class="nav__logo">
            <a href="#lnk"><img src="@/assets/img-logo--logs.svg" alt=""/></a>
        </div>
        <div class="nav__aside">
            <SearchInput></SearchInput>
        </div>
    </header>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
export default {
    name: 'Gnb',
    components: {
        SearchInput,
    },
};
</script>
<style scoped lang="scss">
.nav {
    padding: 40px 60px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__logo {
        display: table;
        a {
            display: inline-block;
            &:not(:first-child) {
                margin-left: 15px;
            }
        }
        img {
            height: 51px;
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
