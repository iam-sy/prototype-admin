<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
        <Dimed></Dimed>
    </div>
</template>

<style lang="scss">
@import '~@/scss/fonts.scss';
@import '~@/scss/common.scss';
@import '~@/scss/github-markdown.scss';
@import '~simplemde/dist/simplemde.min.css';

.markdown-body {
    @import '~@/scss/prism-dracula';
}
</style>
