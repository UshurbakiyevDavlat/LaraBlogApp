import { createRouter, createWebHistory } from 'vue-router';
import PostCreate from '../components/Posts/Create.vue';
import PostsIndex from '../components/Posts/Index.vue';

const routes = [
    { path: '/', name: 'post.index', component: PostsIndex },
    { path: '/posts/create', name: 'post.create', component: PostCreate },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
