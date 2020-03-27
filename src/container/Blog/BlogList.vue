<template>
    <div class="blog-list">
        <div class="blog-list__menu">
            <Menu :sec="posts.config.sec" @secUpdate="secUpdate"></Menu>
        </div>
        <div class="blog-list__search">
            <div class="blog-list__search-item">
                <SearchInput name="schtext" @search="searchText"></SearchInput>
                <SearchItem
                    v-if="posts.config.searchtext"
                    :text="posts.config.searchtext"
                    @remove="textReset"
                ></SearchItem>
            </div>
            <div class="blog-list__search-item">
                <SearchInput
                    name="schtags"
                    id="tags"
                    title="tags"
                    placeholder="tags"
                    @search="searchTags"
                ></SearchInput>
                <SearchItem
                    v-for="(tag, index) in posts.config.searchtags"
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
                    <li v-for="post in posts.items" :key="post._id">
                        <BlogCard :post="post"></BlogCard>
                    </li>
                </ul>
            </div>
            <Paging
                @groupChange="changeGroup"
                @paging="changePaging"
                :perPage="posts.config.perPage"
                :totalPage="posts.config.totalPage"
                :currentPage="posts.config.currentPage"
                :startPage="posts.config.startPage"
                :endPage="posts.config.endPage"
            ></Paging>

            <div class="blog-list__more cta-wrap">
                <router-link to="/blog/write" class="cta">
                    <span>글쓰기</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Paging from '@/components/common/Paging.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import SearchItem from '@/components/common/SearchItem.vue';
import Menu from '@/components/blog/Menu';
import BlogCard from '@/components/blog/BlogCard.vue';

import * as blog from '@/store/modules/blog/type';

import { createNamespacedHelpers } from 'vuex';
const blogStore = createNamespacedHelpers(`${blog.NAMESPACE}`);

export default {
    components: {
        Paging,
        SearchItem,
        SearchInput,
        BlogCard,
        Menu,
    },

    methods: {
        ...blogStore.mapActions([blog.FETCH_ITEMS, blog.FETCH_CONFIG]),
        textReset() {
            this[blog.FETCH_CONFIG]({
                schtext: '',
                searchtext: '',
            });
            this.fetchData(false);
        },
        tagReset(index) {
            const searchtags = this.posts.config.searchtags;
            searchtags.splice(index, 1);
            this[blog.FETCH_CONFIG]({
                schtags: '',
                searchtags: searchtags,
            });
            this.fetchData(false);
        },
        resetSearch() {
            this[blog.FETCH_CONFIG]({
                schtext: '',
                schtags: '',
                currentPage: 1,
            });
            this.pageData();
        },
        secUpdate(data) {
            this[blog.FETCH_CONFIG]({
                sec: data,
                currentPage: 1,
            });
            this.fetchData();
        },
        pageData() {
            let endPage =
                this.posts.config.pageGroup * this.posts.config.perPage; // 화면에 보여질 마지막 페이지 번호
            if (endPage > this.posts.config.totalPage)
                endPage = this.posts.config.totalPage;
            let startPage = endPage - (this.posts.config.perPage - 1); // 화면에 보여질 첫번째 페이지 번호
            if (startPage < 1) startPage = 1;
            this[blog.FETCH_CONFIG]({
                endPage: endPage,
                startPage: startPage,
            });
        },
        changePaging(n) {
            this[blog.FETCH_CONFIG]({ currentPage: n });
            this.fetchData(false);
        },
        changeGroup(indication) {
            let group =
                indication === 'next'
                    ? this.posts.config.pageGroup + 1
                    : this.posts.config.pageGroup - 1;
            switch (indication) {
                case 'next':
                    if (this.totalGroup < group) return;
                    if (this.totalGroup <= group) {
                        this[blog.FETCH_CONFIG]({
                            currentPage:
                                this.posts.config.perPage *
                                    this.posts.config.pageGroup +
                                1,
                            startPage:
                                this.posts.config.perPage *
                                    this.posts.config.pageGroup +
                                1,
                            endPage: this.posts.config.totalPage,
                            pageGroup: this.posts.config.totalGroup,
                        });
                    } else {
                        this[blog.FETCH_CONFIG]({
                            startPage:
                                this.posts.config.perPage *
                                    this.posts.config.pageGroup +
                                1,
                            endPage: this.posts.config.totalPage,
                            pageGroup: group,
                            currentPage: this.posts.config.startPage,
                        });
                    }
                    break;
                case 'prev':
                    if (0 < group) {
                        this[blog.FETCH_CONFIG]({
                            endPage: group * this.posts.config.perPage,
                            currentPage:
                                this.posts.config.endPage -
                                (this.posts.config.perPage - 1),
                            startPage:
                                this.posts.config.endPage -
                                (this.posts.config.perPage - 1),
                            pageGroup: group,
                        });
                    } else {
                        return;
                    }
                    break;
            }
            this.fetchData();
        },
        async fetchData(reSearch = true) {
            try {
                const searchData = {
                    perPage: this.posts.config.perPage,
                    currentPage: this.posts.config.currentPage,
                    pageGroup: this.posts.config.pageGroup,
                    limit: this.posts.config.limit,
                    sec: this.posts.config.sec,
                };
                if (this.posts.config.searchtext)
                    searchData.schtext = this.posts.config.searchtext;
                if (this.posts.config.searchtags.length > 0)
                    searchData.schtags = this.posts.config.searchtags.join(',');

                this[blog.FETCH_ITEMS](searchData);

                if (reSearch) {
                    this.resetSearch();
                }
            } catch (error) {
                console.log(error);
            }
        },
        searchText(val) {
            if (val !== '') {
                this[blog.FETCH_CONFIG]({ schtext: val, searchtext: val });
                this.fetchData();
            } else {
                alert('검색어를 입력하세요');
            }
        },
        searchTags(val) {
            if (val !== '') {
                this[blog.FETCH_CONFIG]({ schtags: val });
                if (this.posts.config.searchtags.indexOf(val) === -1) {
                    const schTags = this.posts.config.searchtags;
                    schTags.push(val);
                    this[blog.FETCH_CONFIG]({ schtags: schTags });
                } else {
                    alert('이미 추가된 태그입니다.');
                }
                this.fetchData();
            } else {
                alert('태그를 입력하세요');
            }
        },
    },
    computed: {
        ...blogStore.mapState(['posts']),
    },
    mounted() {
        //console.log(this);
        //console.log(blogStore);
        //console.log(this.$store);
        //this.fetchData();
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
        margin: 30px 0;
        text-align: center;
    }
}
</style>
