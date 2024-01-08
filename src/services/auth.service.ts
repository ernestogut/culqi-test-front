import culqiApi from '../axios-instance.ts'
class AuthService {
    async login(username: string, password: string) {
        try {
            const data = await culqiApi.post('/login', { username, password })
            return data
        } catch (error) {
            console.log('Something went wrong on login', error)
            throw error
        }
    }
    async logout() {
        try {
            const data = await culqiApi.get('/logout')
            return data
        } catch (error) {
            console.log('Something went wrong on logout', error)
            throw error
        }
    }
}

export default new AuthService()
