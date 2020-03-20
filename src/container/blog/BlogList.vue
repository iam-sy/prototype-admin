<template>
    <div class="blog-list">
        <div class="blog-list__title">
            <Title tit=".logs"></Title>
        </div>
        <div class="blog-list__menu">
            <Menu :sec="sec" @secUpdate="secUpdate"></Menu>
        </div>
        <div class="blog-list__main">
            <div class="blog-list__list">
                <ul>
                    <li v-for="post in postItems" :key="post._id">
                        <BlogCard :post="post"></BlogCard>
                    </li>
                </ul>
                <div class="blog-list__more cta-wrap">
                    <router-link to="/blog/write" class="cta">
                        <span>글쓰기</span>
                    </router-link>
                </div>
            </div>
            <div class="blog-list__quick">
                <div class="blog-list__fixed">
                    <div class="blog-list__filter">
                        <span class="blog-list__filter-title">tag filter</span>
                        <ul>
                            <li>
                                <button
                                    type="button"
                                    class="blog-list__filter-tag"
                                >
                                    <span>Project</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    class="blog-list__filter-tag"
                                >
                                    <span>Javascript</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="blog-list__information">
                        <div class="blog-list__sidelogo">
                            <img src="@/assets/img-logo--logs.svg" alt="" />
                        </div>
                        <a
                            href="mailto:xlrj0716@gmail.com"
                            class="blog-list__email"
                        >
                            xlrj0716@gmail.com
                        </a>
                        <p class="blog-list__copyright">© 2020 · MOON</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/components/common/Title';
import Button from '@/components/common/Button.vue';
import Menu from '@/components/blog/Menu';
import BlogCard from '@/components/blog/BlogCard.vue';

import { fetchPosts } from '@/api/posts.js';

export default {
    components: {
        BlogCard,
        Title,
        Menu,
    },
    data() {
        return {
            sec: 'all',
            postItems: null,
        };
    },
    watch: {
        sec() {
            this.fetchData();
        },
    },
    methods: {
        secUpdate(data) {
            this.sec = data;
        },
        async fetchData() {
            const sec = this.sec;
            try {
                const {
                    data: { posts: postItems },
                } = await fetchPosts(sec);
                this.postItems = postItems;
                return;
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.fetchData();
    },
};
</script>

<style scoped lang="scss">
.blog-list {
    padding: 30px 60px;
    &__title {
        padding-top: 37px;
    }
    &__menu {
        padding-top: 42px;
    }
    &__main {
        position: relative;
    }
    &__list {
        overflow: hidden;
        ul {
            margin-left: -30px;
            margin-right: 215px;
            display: flex;
            flex-wrap: wrap;
            //display: grid;
            //grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
            //grid-gap: 30px 26px;
        }
        li {
            flex: none;
            width: 100%;
            margin-left: 30px;
            max-width: 280px;
            padding-top: 25px;
            list-style-type: none;
        }
    }
    &__more {
        margin: 55px 0;
        text-align: center;
    }
    &__quick {
        position: absolute;
        right: 0;
        top: 0;
        width: 168px;
        margin-top: 26px;
    }
    &__fixed {
        position: fixed;
    }
    &__filter {
        &-title {
            display: block;
            color: $color1;
            font-weight: 500;
            font-size: 14px;
            padding-bottom: 18px;
        }
        li {
            list-style-type: none;

            &:not(:first-child) {
                padding-top: 8px;
            }
        }
        &-tag {
            background-color: $color4;
            color: $color1;
            border: none;
            border-radius: 15px;
            height: 30px;
            padding: 0 20px;
            font-weight: 500;
            font-size: 14px;
        }
    }

    &__information {
        padding-top: 24px;
    }

    &__sidelogo {
        display: block;
    }
    &__email {
        display: inline-block;
        margin-top: 10px;
    }
    &__copyright {
        padding-top: 5px;
    }
}
</style>
