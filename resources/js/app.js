import { TailwindPagination } from 'laravel-vue-pagination';
import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue/dist/vue.esm-bundler';

import './bootstrap';
import PostCreate from './components/Posts/Create.vue';
import PostsIndex from './components/Posts/Index.vue';
import App from './layouts/App.vue';

const routes = [
    { path: '/', component: PostsIndex },
    { path: '/posts/create', component: PostCreate },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App)
app.use(router)

app.component('Pagination', TailwindPagination)
app.mount('#app')
