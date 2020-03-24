<template>
    <div class="code-viewer markdown-body">
        <h1 content="code-viewer__title" v-if="title">
            {{ title }}
        </h1>
        <div class="code-viewer__tags" v-if="tags.length > 0">
            <span type="button" v-for="(tag, index) in tags" :key="index">
                {{ tag }}
            </span>
        </div>
        <div class="code-viewer__sumnail" v-if="image">
            <img :src="image" />
        </div>
        <div class="code-viewer__desc" v-if="desc">
            {{ desc }}
        </div>
        <div class="code-viewer__content" v-html="compileHtml"></div>
    </div>
</template>

<script>
import { parseHtml } from '@/utils/parser';

export default {
    props: ['tags', 'title', 'content', 'image', 'desc', 'tagColor'],
    computed: {
        compileHtml() {
            return parseHtml(this.content);
        },
    },
};
</script>

<style scoped lang="scss">
.code-viewer {
    &__tags {
        display: table;
        font-size: 0;
        width: 100%;
        padding-bottom: 15px;
        span {
            @include tagItem();
        }
    }
    &__desc,
    &__sumnail {
        padding-bottom: 10px;
    }
}
</style>
