import { TailwindPagination } from 'laravel-vue-pagination';
import { createApp } from 'vue/dist/vue.esm-bundler';

import './bootstrap';
import PostsIndex from './components/Posts/Index.vue';

const app = createApp({})
app.component('posts-index', PostsIndex)
app.component('Pagination', TailwindPagination)
app.mount('#app')
