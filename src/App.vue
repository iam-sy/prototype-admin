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
        startSpinner(cb) {
            if (this.isLoading) return;
            console.log('this.isLoading', this.isLoading);
            this.LoadingStatus = true;
            this.$store.commit('LOADING_TOGGLE', this.LoadingStatus);
            this.$dim.show();
            eventBus.$on('dimEventClose', this.endSpinner);
        },
        endSpinner() {
            if (!this.isLoading) return;
            this.LoadingStatus = false;
            this.$store.commit('LOADING_TOGGLE', this.LoadingStatus);
            eventBus.$off('dimEventClose', this.endSpinner);
            this.$dim.hide();
        },
    },

    created() {
        eventBus.$on('start:spinner', this.startSpinner);
        eventBus.$on('end:spinner', this.endSpinner);
    },
    computed: {
        ...mapGetters(['isLoading']),
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
