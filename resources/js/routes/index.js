import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue';
import PostCreate from '../components/Posts/Create.vue';
import PostEdit from '../components/Posts/Edit.vue';
import PostsIndex from '../components/Posts/Index.vue';
import AuthenticatedLayout from '../layouts/Authenticated.vue';
import GuestLayout from '../layouts/Guest.vue';


function auth(to, from, next) {
    if (JSON.parse(localStorage.getItem('loggedIn'))) {
        next()
    }

    next('/login')
}

const routes = [
    {
        path: '/',
        redirect: { name: 'login' },
        component: GuestLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login,
            },
        ],
    },
    {
        component: AuthenticatedLayout,
        beforeEnter: auth,
        children: [
            {
                path: '/posts',
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
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
