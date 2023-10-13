import { Ability, AbilityBuilder } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';
import { inject, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const user = reactive({
    name: '',
    email: '',
});

export default function useAuth() {
    const loginForm = reactive({
        email: '',
        password: '',
        remember: false,
    })

    const router = useRouter()
    const validationErrors = ref({})
    const processing = ref(false)
    const swal = inject('$swal')
    const ability = inject(ABILITY_TOKEN)

    const submitForm = async () => {
        if (processing.value) return

        processing.value = true
        validationErrors.value = {}

        axios.post('/login', loginForm)
            .then(async response => {
                loginUser(response)
            }).catch(error => {
            if (error.response?.data) {
                validationErrors.value = error.response.data.errors
            }
        }).finally(() => {
            processing.value = false
        })
    }

    const getUser = async() => {
        axios.get('/api/user')
            .then(response => {
                loginUser(response)
            })
    }

    const loginUser = async (response) => {
        user.name = response.data.name
        user.email = response.data.email
        localStorage.setItem('loggedIn', JSON.stringify(true))
        await getAbilities()
        await router.push({ name: 'post.index' })
    }

    const logout = async() => {
        if (processing.value) return

        processing.value = true

        axios.post('/logout')
            .then(response => router.push({ name: 'login' }))
            .catch(error => {
                swal({
                    icon: 'error',
                    title: error.response.title,
                    text: error.response.statusText,
                })
            }).finally(() => {
            processing.value = false
        })
    }

    const getAbilities = async () => {
        axios.get('/api/abilities')
            .then(response => {
                const permissions = response.data
                const { can, rules } = new AbilityBuilder(Ability)

                can(permissions)
                ability.update(rules)
            })
    }

    return {
        loginForm,
        validationErrors,
        processing,
        submitForm,
        user,
        getUser,
        logout,
        getAbilities,
    }
}
