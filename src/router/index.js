import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/:dialogId',
        name: 'dialog',
        component: () => import('../components/Dialog.vue')
    }]
});

export default router;
