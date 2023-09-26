import { ref } from 'vue';

export default function useCategories() {
    const categories = ref([])

    const getCategories = async () => {
        axios.get('/api/categories')
            .then(response => {
                categories.value = response.data.data
            })
            .catch(error => {
                console.log(error)
            })
    }

    return { categories, getCategories };
}
