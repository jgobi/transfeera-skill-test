
export const validationRegexes = {
    cpf: /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/,
    cnpj: /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    email: /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/,
    phone: /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
    randomKey: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
}

function checkPixKey(pixKeyType, pixKey) {
    switch (pixKeyType) {
        case 'CPF':
            return validationRegexes.cpf.test(pixKey);
        case 'CNPJ':
            return validationRegexes.cnpj.test(pixKey);
        case 'EMAIL':
            return validationRegexes.email.test(pixKey);
        case 'TELEFONE':
            return validationRegexes.phone.test(pixKey);
        case 'CHAVE_ALEATORIA':
            return validationRegexes.randomKey.test(pixKey);
        default:
            return false;
    }
}

export function validateRecebedor ({ pix_key_type, pix_key, email, name, cpf }) {
    const errors = [];
    if (!['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'].includes(pix_key_type)) {
        errors.push('Tipo da chave PIX inválido.');
    }
    if (!name) {
        errors.push('O nome deve ser preenchido.');
    }
    if (email && (email.length > 250 || !validationRegexes.email.test(email))) {
        errors.push('Email inválido.');
    }
    if (!validationRegexes.cpf.test(cpf) && !validationRegexes.cnpj.test(cpf)) {
        errors.push('CPF ou CNPJ inválidos.');
    }
    if (!checkPixKey(pix_key_type, pix_key)) {
        errors.push('Chave PIX inválida.');
    }

    return errors;
}