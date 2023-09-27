import { ref } from 'vue';

export default function usePosts() {
    const posts = ref({})

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

    return { posts, getPosts };
}
