import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default function usePosts() {
    const posts = ref({})
    const router = useRouter()

    const getPosts = async (
        $page = 1,
        category = '',
        column = 'created_at',
        order = 'desc',
    ) => {
        axios.get(
                '/api/posts?page=' + $page
                + '&category=' + category
                + '&column=' + column
                + '&order=' + order,
            )
            .then(response => {
                posts.value = response.data
            })
            .catch(error => {
                console.log(error)
            })
    }

    const storePost = async (post) => {
        axios.post('/api/posts', post)
            .then(response => {
                router.push({ name: 'post.index' })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return { posts, getPosts, storePost };
}
