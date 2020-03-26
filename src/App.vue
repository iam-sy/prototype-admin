<template>
    <div id="app">
        <Gnb></Gnb>
        <router-view :key="$route.fullPath" />
        <Dimed></Dimed>
        <Spinner :loading="LoadingStatus"></Spinner>
    </div>
</template>

<script>
import Gnb from '@/components/layout/Gnb.vue';
import { mapGetters, mapMutations } from 'vuex';
import eventBus from '@/utils/eventBus';
export default {
    ...mapMutations(['LOADING_TOGGLE']),
    components: {
        Gnb,
    },
    data() {
        return {
            LoadingStatus: false,
        };
    },
    methods: {
        startSpinner() {
            this.LoadingStatus = true;
            this.$dim.show();
            this.$dim.disableEvent();
            eventBus.$on('dimEventClose', this.endSpinner);
        },
        endSpinner() {
            this.LoadingStatus = false;
            eventBus.$off('dimEventClose', this.endSpinner);
            this.$dim.enableEvent();
            this.$dim.hide();
        },
    },

    created() {
        eventBus.$on('start:spinner', this.startSpinner);
        eventBus.$on('end:spinner', this.endSpinner);
    },
    beforeDestroy() {
        eventBus.$off('start:spinner');
        eventBus.$off('end:spinner');
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
