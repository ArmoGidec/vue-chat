import './fake-db';
import 'normalize.css';
import './assets/style.css';
import './assets/fonts/TTNorms/stylesheet.css';

import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './router';

Vue.config.productionTip = false;

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
Vue.filter('toDateString', value =>
    dateFormatter.format(new Date(value)).replace('г.', '')
);

const dateTimeFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
});
Vue.filter('toDateTimeString', value =>
    dateTimeFormatter.format(new Date(value)).replace(',', '')
);

Vue.filter('truncate', (text = '', length = 30) =>
    text.length > length ? text.slice(0, length) + '...' : text
);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
