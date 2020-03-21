<template>
    <router-link :to="`/blog/${post._id}`">
        <div class="blog-card">
            <div class="blog-card__sumnail" v-if="post.image">
                <img :src="addressCompile" alt="" />
            </div>
            <div class="blog-card__title">{{ post.title }}</div>
            <div class="blog-card__desc" v-if="post.desc">
                {{ post.desc }}
            </div>
            <div class="blog-card__date">{{ post.createdAt | formatDate }}</div>
            <div class="blog-card__tags" v-if="post.tags.length > 0">
                <ul>
                    <li v-for="(index, tag) in post.tags" :key="index">
                        {{ post.tags[tag] }}
                    </li>
                </ul>
            </div>
        </div>
    </router-link>
</template>

<script>
import { imagePath } from '@/utils/parser';
export default {
    props: ['post'],
    computed: {
        addressCompile() {
            return imagePath(this.post.image);
        },
    },
};
</script>

<style scoped lang="scss">
.blog-card {
    position: relative;
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(108, 108, 108, 0.07);
    min-height: 414px;
    &__sumnail {
        position: relative;
        min-height: 182px;
        overflow: hidden;
        img {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 100%;
            transform: translate(-50%, -50%);
        }
    }
    &__title,
    &__desc,
    &__date,
    &__tags {
        padding: 0 24px;
        font-family: 'Noto Sans KR';
    }
    &__title {
        color: $color1;
        font-size: 20px;
        font-weight: 500;
        padding-top: 26px;
    }

    &__desc {
        padding-top: 8px;
        font-size: 13px;
        line-height: 1.5;
        min-height: 46px;
        color: $color6;
    }
    &__date {
        padding-top: 10px;
        font-family: 'Roboto';
        font-size: 12px;
        color: $color7;
    }
    &__tags {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        min-height: 37px;
        border-top: 1px solid #f8f8f8;
        ul {
            padding-top: 12px;
            display: table;
            font-size: 0;
            width: 100%;
            height: 100%;
        }
        li {
            display: inline-block;
            vertical-align: middle;
            padding-left: 15px;
            padding-bottom: 10px;
            font-family: 'Noto Sans KR';
            font-size: 12px;
            list-style-type: none;
            color: $color3;
            background: {
                image: url('~@/assets/ico-tag.svg');
                repeat: no-repeat;
            }
            &:not(:last-child) {
                margin-right: 10px;
            }
        }
    }
}
</style>
