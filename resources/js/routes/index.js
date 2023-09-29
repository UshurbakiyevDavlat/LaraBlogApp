import { createRouter, createWebHistory } from 'vue-router';
import PostCreate from '../components/Posts/Create.vue';
import PostsIndex from '../components/Posts/Index.vue';

const routes = [
    {
        path: '/',
        name: 'post.index',
        component: PostsIndex,
        meta: { title: 'PostIndex' },
    },
    {
        path: '/posts/create',
        name: 'post.create',
        component: PostCreate,
        meta: { title: 'PostCreate' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
