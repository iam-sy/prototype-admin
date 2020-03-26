import Dimed from './Dimed';
import { scrollLock } from '@/utils/scrollbar';
const componentName = 'Dimed';
const Plugin = {
    install(Vue, options = {}) {
        if (this.installed) return;
        this.installed = true;
        this.event = new Vue();

        Vue.component(componentName, Dimed);

        this.event.$on('getRefs', ref => {
            Plugin.refs = ref;
            Vue.prototype.$dimElement = this.refs;
        });

        Vue.prototype.$dim = {
            show(cb) {
                scrollLock(true);
                Plugin.event.$emit('toggle', true, cb);
            },
            hide(cb) {
                scrollLock(false);
                Plugin.event.$emit('toggle', false, cb);
            },
            disableEvent(cb) {
                Plugin.event.$emit('disableEvent', false);
            },
            enableEvent(cb) {
                Plugin.event.$emit('disableEvent', true);
            },
        };
        Vue.prototype.$dimComp = Dimed;
    },
};

export default Plugin;
