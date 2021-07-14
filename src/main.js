import Vue from 'vue';
import app from './app.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/styles.scss';
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: (h) => h(app),
}).$mount('#app');
