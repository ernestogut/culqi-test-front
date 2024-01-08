const alphabets: string[] = ["?", "@", "."];
const numbers = [...alphabets, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const alphanumerics = [...numbers];

for (let i = 65; i < 91; i++) {
    alphabets.push(String.fromCharCode(i));
    alphanumerics.push(String.fromCharCode(i));
}


const getCardBrand = (cardNumber: string) => {
    const cleanedNumber = cardNumber.replace(/\D/g, '');

    if (/^4/.test(cleanedNumber)) {
        return 'Visa';
    } else if (/^5[1-5]/.test(cleanedNumber)) {
        return 'Mastercard';
    } else if (/^3[47]/.test(cleanedNumber)) {
        return 'American Express';
    } else {
        return 'Desconocido';
    }
}

export { alphabets, numbers, alphanumerics, getCardBrand };
