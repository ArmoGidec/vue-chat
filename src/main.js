import './fake-db';
import 'normalize.css';
import './assets/style.css';
import './assets/fonts/TTNorms/stylesheet.css';

import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.filter('toDateString', value => {
    const date = new Date(value);
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return formatter.format(date).replace('г.', '');
});

Vue.filter('truncate', (text = '', length = 30) =>
    text.length > length ? text.slice(0, length) + '...' : text
);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
