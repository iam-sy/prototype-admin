import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Dimed from '@/plugins/dimed/index';
import Modal from '@/plugins/modal/index';
import Validate from '@/plugins/validate/index';
import { formatDate } from '@/utils/parser';

Vue.config.productionTip = false;

Vue.use(Validate);
Vue.use(Dimed);
Vue.use(Modal);
Vue.filter('formatDate', formatDate);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
