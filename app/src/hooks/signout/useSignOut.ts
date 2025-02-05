import { useRouter } from 'vue-router'
import useAuthToken from './../auth/useAuthToken'

export default function useSignOut() {
    const router = useRouter()
    const { setToken } = useAuthToken()

    async function signOut() {
        setToken('')
        router.push({ name: 'signin' })
    }

    return {
        signOut,
    }
}
