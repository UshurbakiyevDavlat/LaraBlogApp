import { TailwindPagination } from 'laravel-vue-pagination';
import VueSweetalert2 from 'vue-sweetalert2';
import { createApp } from 'vue/dist/vue.esm-bundler';

import './bootstrap';
import App from './layouts/App.vue';
import router from './routes';

const app = createApp(App)
app.use(router)
app.use(VueSweetalert2);

app.component('Pagination', TailwindPagination)
app.mount('#app')
