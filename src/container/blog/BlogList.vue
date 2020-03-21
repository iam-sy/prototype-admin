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
                <SearchItem
                    v-if="searchtext"
                    :text="searchtext"
                    @remove="textReset"
                ></SearchItem>
            </div>
            <div class="blog-list__search-item">
                <SearchInput
                    v-model="schtags"
                    id="tags"
                    title="tags"
                    placeholder="tags"
                    @search="searchTags"
                ></SearchInput>
                <SearchItem
                    v-for="(tag, index) in searchtags"
                    :key="`${tag}_${index}`"
                    :text="tag"
                    :index="index"
                    @remove="tagReset"
                ></SearchItem>
            </div>
        </div>
        <div class="blog-list__main">
            <div class="blog-list__list">
                <ul>
                    <li v-for="post in postItems" :key="post._id">
                        <BlogCard :post="post"></BlogCard>
                    </li>
                </ul>
            </div>

            <div class="blog-list__more cta-wrap">
                <router-link to="/blog/write" class="cta">
                    <span>글쓰기</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import SearchInput from '@/components/common/SearchInput.vue';
import SearchItem from '@/components/common/SearchItem.vue';
import Menu from '@/components/blog/Menu';
import BlogCard from '@/components/blog/BlogCard.vue';

import { fetchPosts } from '@/api/posts.js';

export default {
    components: {
        SearchItem,
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
        textReset() {
            this.schtext = '';
            this.searchtext = '';
            this.searchHandler();
        },
        tagReset(index) {
            console.log(index);
            this.schtags = '';
            this.searchtags.splice(index, 1);
            this.searchHandler();
        },
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
                };

                if (this.searchtext) searchData.schtext = this.searchtext;
                if (this.searchtags.length > 0)
                    searchData.schtags = this.searchtags.join(',');
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
                if (this.searchtags.indexOf(val) === -1) {
                    this.searchtags.push(val);
                } else {
                    alert('이미 추가된 태그입니다.');
                }
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
    padding: 25px 0 30px;
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
            max-width: 300px;
            margin-left: 30px;
            padding-top: 25px;
            list-style-type: none;
        }
    }
    &__search {
        display: table;
        width: 100%;
        font-size: 0;
        margin-top: 30px;
        &-item {
            vertical-align: top;
            display: inline-block;
            &:not(:first-child) {
                margin-left: 25px;
            }
        }
    }
    &__more {
        margin: 55px 0;
        text-align: center;
    }
}
</style>
