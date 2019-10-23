import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex, { StoreOptions } from 'vuex';
import { RootState, LysanderState } from '@/interfaces'
import { lysander } from '@/vuex-module';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element, { locale });

import log from 'loglevel';
log.setLevel(log.levels.INFO);

Vue.config.productionTip = false;


Vue.use(Vuex);
const store = new Vuex.Store({ modules: { lysander } });

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
