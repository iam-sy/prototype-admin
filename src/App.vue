<template>
    <div id="app">
        <Gnb></Gnb>
        <router-view :key="$route.fullPath" />
        <Dimed></Dimed>
    </div>
</template>

<script>
import Gnb from '@/components/layout/Gnb.vue';

export default {
    components: {
        Gnb,
    },
};
</script>

<style lang="scss">
@import '~@/scss/fonts.scss';
@import '~@/scss/common.scss';
@import '~@/scss/github-markdown.scss';
@import '~simplemde/dist/simplemde.min.css';

.markdown-body {
    @import '~@/scss/prism-dracula';
}
</style>
