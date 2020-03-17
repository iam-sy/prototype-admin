<template>
    <header class="nav">
        <div class="nav__logo">
            <router-link to="/blog/list">
                Posts
            </router-link>
        </div>
    </header>
</template>

<style scoped lang="scss">
.nav {
    background-color: #4f4f4f;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__logo {
        display: table;
        a {
            color: #fff;
            font-weight: 500;
            font-size: 16px;
            display: inline-block;
            &:not(:first-child) {
                margin-left: 15px;
            }
        }
        img {
            height: 51px;
        }
    }
}
</style>
