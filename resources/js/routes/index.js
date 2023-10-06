import { createRouter, createWebHistory } from 'vue-router';
import PostCreate from '../components/Posts/Create.vue';
import PostsIndex from '../components/Posts/Index.vue';
import PostEdit from '../components/Posts/Edit.vue';

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
    {
        path: '/posts/edit/:id',
        name: 'post.edit',
        component: PostEdit,
        meta: { title: 'PostEdit' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
