import Vue from 'vue';
import VueRouter from 'vue-router';

import Dialog from '../components/Dialog.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/:dialogId',
        name: 'dialog',
        component: Dialog
    }]
});

export default router;
