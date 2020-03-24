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
        <div class="blog-view__list"></div>
    </div>
</template>

<script>
import CodeViewer from '@/components/CodeEditor/CodeViewer';
import BlogHeadMenu from '@/components/blog/BlogHeadMenu';
import { imagePath, parseHeadings } from '@/utils/parser';
import { fetchPostById } from '@/api/index';
export default {
    components: {
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
        };
    },
    methods: {
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
    },
    computed: {
        addressCompile() {
            return this.image ? imagePath(this.image) : '';
        },
    },
    async created() {
        const id = this.$route.params.id;
        const { data } = await fetchPostById(id);
        this.headingsInfo = parseHeadings(data.posts.content);
        console.log(this.headingsInfo);
        this.setForm(data);
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
        left: -300px;
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
}
</style>
