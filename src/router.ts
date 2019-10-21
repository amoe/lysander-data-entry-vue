import Vue from 'vue';
import Router from 'vue-router';
import RowCodingView from './views/RowCodingView.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: RowCodingView,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '/graph',
            name: 'graph',
            component: () => import(/* webpackChunkName: "graph" */ './views/Graph.vue'),
        },
        {
            path: '/workspace',
            name: 'workspace',
            component: () => import(/* webpackChunkName: "graph" */ './views/Workspace.vue'),
        },
    ],
});
