import useAuth from './composables/auth';
import { abilitiesPlugin } from '@casl/vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import { onMounted } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { createApp } from 'vue/dist/vue.esm-bundler';

import './bootstrap';
import router from './routes';
import ability from './services/ability';

const app = createApp({
    setup() {
        const { getUser } = useAuth()
        onMounted(getUser)
    },
})
app.use(router)
app.use(VueSweetalert2)
app.use(abilitiesPlugin, ability)

app.component('Pagination', TailwindPagination)
app.mount('#app')
