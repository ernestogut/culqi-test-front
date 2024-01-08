import { defineStore } from 'pinia'
import { getUserData } from "@/auth/utils";
import { User } from '@/interfaces/user';
import { useRouter } from 'vue-router';
export const useAuthStore = defineStore('auth', () => {
    const currentUser: User = getUserData()
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('privateKey');
        router.push({ name: 'login' })
    }

    return {
        currentUser,
        logout
    }

})