import { computed, ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { Card } from '@/interfaces/card'
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers, minValue, maxValue, maxLength } from "@vuelidate/validators";
export const useCardStore = defineStore('card', () => {
    const card: Ref<Card> = ref({
        cardNumber: '',
        cvv: '',
        expirationMonth: '',
        expirationYear: '',
        email: '',
    })


    const resetCard = () => {
        card.value = {
            cardNumber: '',
            cvv: '',
            expirationMonth: '',
            expirationYear: '',
            email: '',
        }
    }

    const setCard = (cardFound: Card) => {
        card.value = cardFound
    }

    const requiredMsg = (field: string) => {
        return helpers.withMessage(`${field} no puede estar vacio`, required);
    };

    const minLengthMsg = (message: string, length: number) => {
        return helpers.withMessage(message, minLength(length));
    };

    const maxLengthMsg = (message: string, length: number) => {
        return helpers.withMessage(message, maxLength(length));
    }

    const regexMsg = (message: string, regex: RegExp) => {
        return helpers.withMessage(message, helpers.regex(regex));
    };

    const rules = computed(() => {
        const currentYear = new Date().getFullYear().toString().substring(2);

        return {
            email: {
                required: requiredMsg("Email"),
                minLength: minLengthMsg("Name must contain at least 6 characters", 6),
                regex: regexMsg("Email invalido", /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
            },
            cardNumber: {
                required: requiredMsg("Numero de tarjeta"),
                minLength: minLengthMsg("Numero de tarjeta debe tener al menos 13 digitos", 13 + 3),
                maxLength: maxLengthMsg("Numero de tarjeta debe tener como maximo 16 digitos", 16 + 3),
                regex: regexMsg("Numero de tarjeta invalido", /^[\d\s]+$/),
            },
            expirationMonth: {
                required: requiredMsg("Fecha de Exp."),
                regex: regexMsg("Mes Invalido", /^(0[1-9])|(1[0-2])$/),
            },
            expirationYear: {
                required: requiredMsg("Fecha de Exp."),
                regex: regexMsg("Año invalido", /^([0-9][0-9])$/),
                minValue: helpers.withMessage("Tarjeta Expirada", minValue(+currentYear)),
                maxValue: helpers.withMessage("Maxima expiracion es en 5 años", maxValue(+currentYear + 5)),
            },
            cvv: {
                required: requiredMsg("CVV"),
                minLength: minLengthMsg("CVV Invalido", 3),
                minValue: helpers.withMessage("CVV Invalido", minValue(1)),
            },
        };
    });
    return {
        card,
        resetCard,
        setCard,
        v$: useVuelidate(rules, card),
    }
})
