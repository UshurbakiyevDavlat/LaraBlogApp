import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

export default function usePosts() {
    const posts = ref({})
    const post = ref({})
    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal');

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

    const getPost = async (id) => {
        axios.get('/api/posts/' + id)
            .then(response => {
                post.value = response.data.data
            })
            .catch(error => {
                console.log(error)
            })
    }

    const storePost = async (post) => {
        if (isLoading.value) {
            return;
        }

        let serializedPost = new FormData()
        for (let item in post) {
            if (post.hasOwnProperty(item)) {
                serializedPost.append(item, post[item])
            }
        }

        isLoading.value = true
        validationErrors.value = {}

        axios.post('/api/posts', serializedPost)
            .then(response => {
                router.push({ name: 'post.index' })
                swal({
                    icon: 'success',
                    title: 'Post created successfully!',
                })
            })
            .catch(error => {
                console.log(error)
                validationErrors.value = error.response.data.errors
            }).finally(() => (isLoading.value = false))
    }

    const updatePost = async (post) => {
        if (isLoading.value) {
            return;
        }

        validationErrors.value = {}
        isLoading.value = true

        axios.put('/api/posts/' + post.id, post)
            .then(response => {
                router.push({ name: 'post.index' })
                swal({
                    icon: 'success',
                    title: 'Post updated successfully!',
                })
            })
            .catch(error => {
                console.log(error)
                validationErrors.value = error.response.data.errors
            })
            .finally(() => (
                isLoading.value = false
            ))
    }

    const deletePost = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true,
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/posts/' + id)
                        .then(response => {
                            getPosts()
                            router.push({ name: 'post.index' })
                            swal({
                                icon: 'success',
                                title: 'Post deleted successfully',
                            })
                        })
                        .catch(error => {
                            console.log(error)
                            swal({
                                icon: 'error',
                                title: 'Something went wrong',
                            })
                        })
                }
            })
    }

    return {
        posts,
        getPosts,
        getPost,
        post,
        storePost,
        updatePost,
        validationErrors,
        isLoading,
        deletePost,
    };
}
