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
            <BlogLink :next="next" :prev="prev" @update="idUpdate"></BlogLink>
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
import { imagePath, parseHeadings } from '@/utils/parser';
import { fetchPostById, deletePostById } from '@/api/index';
export default {
    name: 'BlogView',
    components: {
        BlogLink,
        BlogHeadMenu,
        CodeViewer,
    },
    data() {
        return {
            sec: '',
            title: '',
            tags: [],
            desc: '',
            image: '',
            content: '',
            createdAt: '',
            headingsInfo: '',
            next: '',
            prev: '',
        };
    },
    methods: {
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

        setForm({
            posts: { sec, title, image, tags, desc, content, createdAt },
        }) {
            this.sec = sec;
            this.title = title;
            this.image = image;
            this.tags = tags;
            this.desc = desc;
            this.content = content;
            this.createdAt = createdAt;
        },
        async fetchId(id) {
            const { data } = await fetchPostById(id);
            this.next = data.next;
            this.prev = data.prev;
            this.headingsInfo = parseHeadings(data.posts.content);
            this.setForm(data);
        },
        cancelPost() {
            this.$router.push('/blog/list');
        },
        idUpdate(id) {
            this.fetchId(id);
        },
    },
    computed: {
        addressCompile() {
            return this.image ? imagePath(this.image) : '';
        },
    },
    created() {
        console.log(this.$route.params.id);
        const id = this.$route.params.id;
        this.fetchId(id);
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
