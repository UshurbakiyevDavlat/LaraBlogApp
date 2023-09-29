import { TailwindPagination } from 'laravel-vue-pagination';
import { createApp } from 'vue/dist/vue.esm-bundler';

import './bootstrap';
import App from './layouts/App.vue';
import router from './routes';

const app = createApp(App)
app.use(router)

app.component('Pagination', TailwindPagination)
app.mount('#app')
