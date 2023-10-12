import useAuth from '@/composables/auth.js';
import { TailwindPagination } from 'laravel-vue-pagination';
import { onMounted } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { createApp } from 'vue/dist/vue.esm-bundler';

import './bootstrap';
import router from './routes';

const app = createApp({
    setup () {
        const { getUser } = useAuth()
        onMounted(getUser)
    }
})
app.use(router)
app.use(VueSweetalert2);

app.component('Pagination', TailwindPagination)
app.mount('#app')
