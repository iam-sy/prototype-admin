<template>
    <div class="blog-view">
        <div class="blog-view__menu">
            <BlogHeadMenu :headingsInfo="headingsInfo"></BlogHeadMenu>
        </div>
        <div class="blog-view__sec">
            <span class="blog-view__secname">.{{ sec }}_</span>
            <span class="blog-view__date">{{ createdAt | formatDate }}</span>
        </div>
        <div class="blog-view__viewer">
            <CodeViewer
                :desc="desc"
                :image="addressCompile"
                :content="content"
                :title="title"
                :tags="tags"
                tagColor="black"
            ></CodeViewer>
        </div>
        <div class="blog-view__linkpost">
            <BlogLink :next="next" :prev="prev"></BlogLink>
        </div>
        <div class="board-write__control cta-wrap">
            <button type="button" class="cta cta--dark" @click="cancelPost">
                <span>취소</span>
            </button>
            <router-link
                :to="{ name: 'blogmodify', params: { id: $route.params.id } }"
                class="cta cta--green"
            >
                <span>수정</span>
            </router-link>
            <button type="button" @click="deletePost" class="cta">
                <span>삭제</span>
            </button>
        </div>
    </div>
</template>

<script>
import CodeViewer from '@/components/CodeEditor/CodeViewer';
import BlogLink from '@/components/blog/BlogLink';
import BlogHeadMenu from '@/components/blog/BlogHeadMenu';
import { imagePath } from '@/utils/parser';
import { deletePostById } from '@/api/index';
import * as blog from '@/store/modules/blog/type';

import { createNamespacedHelpers } from 'vuex';
const blogStore = createNamespacedHelpers(`${blog.NAMESPACE}`);

export default {
    name: 'BlogView',
    components: {
        BlogLink,
        BlogHeadMenu,
        CodeViewer,
    },
    computed: {
        addressCompile() {
            return this.image ? imagePath(this.image) : '';
        },
        ...blogStore.mapState({
            sec: state => state.sec,
            title: state => state.title,
            image: state => state.image,
            tags: state => state.tags,
            desc: state => state.desc,
            content: state => state.content,
            createdAt: state => state.createdAt,
            next: state => state.next,
            prev: state => state.prev,
            headingsInfo: state => state.headingsInfo,
        }),
    },
    methods: {
        ...blogStore.mapActions([blog.FETCH_ITEM]),
        async deletePost(id) {
            try {
                const id = this.$route.params.id;
                if (confirm('Delete it?')) {
                    const response = await deletePostById(id);
                    this.$router.push('/blog/list');
                }
            } catch (error) {
                console.log(error);
            }
        },
        cancelPost() {
            this.$router.push('/blog/list');
        },
    },
    created() {
        this[blog.FETCH_ITEM](this.$route.params.id);
    },
};
</script>

<style scoped lang="scss">
.blog-view {
    position: relative;
    max-width: 837px;
    margin: 30px auto 0 auto;

    &__menu {
        position: absolute;
        width: 280px;
        left: -280px;
        top: 127px;
        menu {
            position: fixed;
        }
    }
    &__sec {
        padding-bottom: 20px;
    }
    &__secname {
        font-size: 14px;
        font-weight: 500;
        color: $color6;
    }
    &__date {
        font-family: 'Noto Sans KR';
        font-size: 12px;
        color: $color7;
    }
    &__linkpost {
        position: absolute;
        right: -338px;
        width: 280px;
        top: 127px;
    }
}
</style>
