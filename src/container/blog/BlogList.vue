<template>
    <div class="blog-list">
        <div class="blog-list__menu">
            <Menu :sec="sec" @secUpdate="secUpdate"></Menu>
        </div>
        <div class="blog-list__search">
            <div class="blog-list__search-item">
                <SearchInput
                    v-model="schtext"
                    @search="searchText"
                ></SearchInput>
            </div>
            <div class="blog-list__search-item">
                <SearchInput
                    v-model="schtags"
                    id="tags"
                    title="tags"
                    placeholder="tags"
                    @search="searchTags"
                ></SearchInput>
            </div>
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
        </div>
    </div>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
import Menu from '@/components/blog/Menu';
import BlogCard from '@/components/blog/BlogCard.vue';

import { fetchPosts } from '@/api/posts.js';

export default {
    components: {
        SearchInput,
        BlogCard,
        Menu,
    },
    data() {
        return {
            sec: 'all',
            postItems: null,
            schtext: '',
            schtags: '',
            searchtext: '',
            searchtags: [],
        };
    },
    watch: {
        sec() {
            this.fetchData();
        },
    },
    methods: {
        resetSearch() {
            this.schtext = '';
            this.schtags = '';
        },
        secUpdate(data) {
            this.sec = data;
        },
        async fetchData() {
            const sec = this.sec;
            try {
                const {
                    data: { posts: postItems },
                } = await fetchPosts({
                    sec: sec,
                });
                this.postItems = postItems;
            } catch (error) {
                console.log(error);
            }
        },
        async searchHandler() {
            try {
                const searchData = {
                    sec: this.sec,
                    schtext: this.searchtext,
                    schtags: this.searchtags.join(','),
                };
                const {
                    data: { posts: postItems },
                } = await fetchPosts(searchData);
                this.postItems = postItems;
                this.resetSearch();
            } catch (error) {
                console.log(error);
            }
        },
        searchText(val) {
            if (val !== '') {
                this.schtext = val;
                this.searchtext = val;
                this.searchHandler();
            } else {
                alert('검색어를 입력하세요');
            }

            this.searchHandler();
        },
        searchTags(val) {
            if (val !== '') {
                this.schtags = val;
                this.searchtags.push(val);
                this.searchHandler();
            } else {
                alert('태그를 입력하세요');
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
    padding: 20px 60px 30px 60px;
    &__search {
        margin-top: 30px;
    }
    &__main {
        position: relative;
    }
    &__list {
        overflow: hidden;
        ul {
            margin-left: -30px;
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
    &__search {
        display: table;
        width: 100%;
        font-size: 0;
        &-item {
            vertical-align: top;
            display: inline-block;
            &:not(:first-child) {
                margin-left: 10px;
            }
        }
    }
    &__more {
        margin: 55px 0;
        text-align: center;
    }
}
</style>
