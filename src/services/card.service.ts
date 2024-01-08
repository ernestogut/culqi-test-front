import culqiApi from '../axios-instance.ts'
class CardService {
    async tokenizeCard(cardNumber: number, cvv: number, expirationMonth: string, expirationYear: string, email: string, privateKey: string) {
        try {
            const data = await culqiApi.post('/tokenize-card', {
                card_number: cardNumber,
                cvv,
                expiration_month: expirationMonth,
                expiration_year: expirationYear,
                email
            }, {
                headers: {
                    Authorization: privateKey
                }
            })
            return data
        } catch (error) {
            console.log('Something went wrong on tokenizeCard', error)
            throw error
        }
    }
    async findCardByToken(token: string, privateKey: string) {
        try {
            const data = await culqiApi.get('/find-card', {
                headers: {
                    Authorization: token,
                    AuthorizationPK: privateKey
                }
            })
            return data
        } catch (error) {
            console.log('Something went wrong on findCardByToken', error)
            throw error
        }
    }
}

export default new CardService()
