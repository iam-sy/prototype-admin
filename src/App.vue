<template>
    <div id="app">
        <Gnb v-if="ISLOGIN"></Gnb>
        <router-view :key="$route.fullPath" />
        <Footer></Footer>
        <Dimed></Dimed>
        <Spinner :loading="LoadingStatus"></Spinner>
    </div>
</template>

<script>
import eventBus from '@/utils/eventBus';

import Gnb from '@/components/layout/Gnb.vue';
import Footer from '@/components/layout/Footer.vue';

import * as auth from '@/store/modules/auth/type';
import { createNamespacedHelpers } from 'vuex';
const authStore = createNamespacedHelpers(`${auth.NAMESPACE}`);
export default {
    components: {
        Gnb,
        Footer,
    },
    data() {
        return {
            LoadingStatus: false,
        };
    },
    computed: {
        ...authStore.mapGetters([auth.ISLOGIN]),
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
