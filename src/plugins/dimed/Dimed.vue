<template>
    <transition name="fade">
        <div
            id="dimed"
            class="dimed"
            ref="dimed"
            aria-hidden="true"
            v-show="show"
            @click="clickOverlay"
            @touchstart="clickOverlay"
        ></div>
    </transition>
</template>
<script>
import Dimed from './index';
import eventBus from '@/utils/eventBus';
export default {
    props: {
        defaultShow: {
            type: Boolean,
        },
        disableEvent: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            overlayEvent: true,
            show: false,
        };
    },
    methods: {
        dimToggle(state, cb) {
            this.show = state;
            if (!state) {
                eventBus.$emit('dimEventClose', false);
            }
            if (typeof cb === 'function') cb();
        },
        clickOverlay() {
            if (!this.overlayEvent) return;
            this.dimToggle(false);
        },
        clickEvent(state) {
            this.overlayEvent = state;
        },
    },

    beforeMount() {
        Dimed.event.$on('disableEvent', this.clickEvent);
        Dimed.event.$on('toggle', this.dimToggle);
    },
    beforeDestroy() {
        Dimed.event.$off('disableEvent', this.clickEvent);
        Dimed.event.$off('toggle', this.dimToggle);
    },
    created() {
        if (this.disableEvent) this.overlayEvent = false;
        if (this.defaultShow) {
            this.show = this.defaultShow;
        }
    },
};
</script>
<style scoped lang="scss">
.dimed {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparentize(#000, 0.5);
    z-index: 100;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
