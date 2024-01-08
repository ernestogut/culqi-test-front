import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
export const useTokenStore = defineStore('token', () => {
    const token: Ref<string> = ref('');

    const setToken = (generatedToken: string) => {
        token.value = generatedToken;
    }

    return {
        token,
        setToken,
    }

})