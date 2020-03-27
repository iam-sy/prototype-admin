<template>
    <menu class="blog-menu" v-if="headingsInfo">
        <ul>
            <li
                v-for="(item, index) in headingsInfo"
                :key="index"
                :class="item.level ? `blog-menu__level${item.level}` : false"
            >
                <a :href="`#${item.id}`">{{ item.text }}</a>
            </li>
        </ul>
    </menu>
</template>

<script>
export default {
    props: ['headingsInfo'],
};
</script>

<style lang="scss">
html {
    scroll-behavior: smooth;
    overscroll-behavior: contain none;
}
</style>

<style scoped lang="scss">
.blog-menu {
    scroll-behavior: smooth;
    overscroll-behavior: contain none;
    background-color: transparentize($color1, 0.1);
    padding: 20px;
    border-radius: 4px;
    li {
        list-style: none;
        border-bottom: 1px solid transparentize(#fff, 0.8);
        a {
            letter-spacing: -1px;
            font-size: 15px;
            display: block;
            padding: 12px 0;
            color: #fff;
        }

        &:last-child {
            padding-bottom: 0;
            border-bottom: none;
        }

        &[class=''] + [class^='blog-menu__level'] {
            margin-top: 10px;
        }

        &[class^='blog-menu__level'] {
            font-size: 14px;
            border-bottom: none;
            a {
                padding: 8px 0;
                font-weight: normal;
                font-size: 14px;
            }
            & + [class=''] {
                border-top: 1px solid transparentize(#fff, 0.8);
                margin-top: 10px;
            }
        }
    }
}
</style>
