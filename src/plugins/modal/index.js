import Modal from '@/plugins/modal/Modal';

const defaultComponentName = 'Modal';

const Plugin = {
    install(Vue, options = {}) {
        if (this.installed) return;
        this.installed = true;
        this.event = new Vue();
        const componentName = options.componentName || defaultComponentName;

        const showStaticModal = (modal, params) => {
            Plugin.event.$emit('toggle', modal, true, params);
        };

        Vue.prototype.$modal = {
            show(modal, ...args) {
                return showStaticModal(modal, ...args);
            },
            hide(name, params) {
                Plugin.event.$emit('toggle', name, false, params);
            },
            toggle(name, params) {
                Plugin.event.$emit('toggle', name, undefined, params);
            },
        };

        Vue.component(componentName, Modal);
    },
};

export default Plugin;
