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
            <Paging
                @groupChange="changeGroup"
                @paging="changePaging"
                :perPage="perPage"
                :totalPage="totalPage"
                :currentPage="currentPage"
                :startPage="startPage"
                :endPage="endPage"
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

import { fetchPosts } from '@/api/posts.js';

export default {
    components: {
        Paging,
        SearchItem,
        SearchInput,
        BlogCard,
        Menu,
    },
    data() {
        return {
            sec: 'all',
            postItems: null,
            currentPage: 1,
            startPage: 1,
            endPage: null,
            total: null,
            totalPage: null,
            pageGroup: 1,
            perPage: 10,
            limit: 10,
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
            this.fetchData(false);
        },
        tagReset(index) {
            this.schtags = '';
            this.searchtags.splice(index, 1);
            this.fetchData(false);
        },
        resetSearch() {
            this.schtext = '';
            this.schtags = '';
            this.currentPage = 1;
            this.pageData();
        },
        secUpdate(data) {
            this.sec = data;
        },
        pageGroupData() {
            this.totalPage = Math.ceil(this.total / this.limit); // 총 페이지 수
            this.pageGroup = Math.ceil(this.currentPage / this.perPage); // 페이지 그룹
            this.totalGroup = Math.ceil(this.totalPage / this.perPage);
        },
        pageData() {
            this.endPage = this.pageGroup * this.perPage; // 화면에 보여질 마지막 페이지 번호
            if (this.endPage > this.totalPage) this.endPage = this.totalPage;
            this.startPage = this.endPage - (this.perPage - 1); // 화면에 보여질 첫번째 페이지 번호
            if (this.startPage < 1) this.startPage = 1;
        },
        changePaging(n) {
            this.currentPage = n;
            this.fetchData(false);
        },
        changeGroup(indication) {
            let group =
                indication === 'next' ? this.pageGroup + 1 : this.pageGroup - 1;
            switch (indication) {
                case 'next':
                    if (this.totalGroup < group) return;
                    if (this.totalGroup <= group) {
                        this.currentPage = this.perPage * this.pageGroup + 1;
                        this.startPage = this.perPage * this.pageGroup + 1;
                        this.endPage = this.totalPage;
                        this.pageGroup = this.totalGroup;
                    } else {
                        this.startPage = this.perPage * this.pageGroup + 1;
                        this.endPage = this.totalPage;
                        this.pageGroup = group;
                        this.currentPage = this.startPage;
                    }
                    break;
                case 'prev':
                    if (0 < group) {
                        this.endPage = group * this.perPage;
                        this.currentPage = this.endPage - (this.perPage - 1);
                        this.startPage = this.endPage - (this.perPage - 1);
                        this.pageGroup = group;
                    } else {
                        return;
                    }
                    break;
            }
            this.fetchData();
        },
        async fetchData(reSearch = true) {
            const sec = this.sec;
            try {
                const searchData = {
                    perPage: this.perPage,
                    currentPage: this.currentPage,
                    pageGroup: this.pageGroup,
                    limit: this.limit,
                    sec: this.sec,
                };
                if (this.searchtext) searchData.schtext = this.searchtext;
                if (this.searchtags.length > 0)
                    searchData.schtags = this.searchtags.join(',');

                const {
                    data: { totalCount, posts: postItems },
                } = await fetchPosts({
                    ...searchData,
                    perPage: this.perPage,
                    currentPage: this.currentPage,
                    pageGroup: this.pageGroup,
                    limit: this.limit,
                    sec: sec,
                });

                this.postItems = postItems;
                this.total = totalCount;
                this.pageGroupData();
                if (reSearch) {
                    this.resetSearch();
                }
            } catch (error) {
                console.log(error);
            }
        },
        searchText(val) {
            if (val !== '') {
                this.schtext = val;
                this.searchtext = val;
                this.fetchData();
            } else {
                alert('검색어를 입력하세요');
            }
        },
        searchTags(val) {
            if (val !== '') {
                this.schtags = val;
                if (this.searchtags.indexOf(val) === -1) {
                    this.searchtags.push(val);
                } else {
                    alert('이미 추가된 태그입니다.');
                }
                this.fetchData();
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
        margin: 30px 0;
        text-align: center;
    }
}
</style>
