import { validateRecebedor } from "./recebedor.js"

describe("Validação do recebedor", () => {
    test('válido cpf', () => {
        const recebedor = {
            pix_key_type: 'CPF',
            pix_key: '123.456.789-00',
            email: 'ALBERTO@BOL.COM',
            name: "Alberto",
            cpf: '123.456.789-00',
        }
        expect(validateRecebedor(recebedor)).toHaveLength(0);
    });

    test('válido cnpj', () => {
        const recebedor = {
            pix_key_type: 'CPF',
            pix_key: '123.456.789-00',
            email: 'ALBERTO@BOL.COM',
            name: "Alberto",
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toHaveLength(0);
    });

    test('válido sem email', () => {
        const recebedor = {
            pix_key_type: 'CPF',
            pix_key: '123.456.789-00',
            name: "Alberto",
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toHaveLength(0);
    });
    
    test('válido chave CNPJ', () => {
        const recebedor = {
            pix_key_type: 'CNPJ',
            pix_key: '12.345.678/9876-54',
            name: "Alberto",
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toHaveLength(0);
    });
    
    test('válido chave email', () => {
        const recebedor = {
            pix_key_type: 'EMAIL',
            pix_key: 'ALBERTO@BOL.COM',
            name: "Alberto",
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toHaveLength(0);
    });
    
    test('válido chave telefone', () => {
        const recebedor = {
            pix_key_type: 'TELEFONE',
            pix_key: '+5512934567890',
            name: "Alberto",
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toHaveLength(0);
    });
    
    test('válido chave aleatória', () => {
        const recebedor = {
            pix_key_type: 'CHAVE_ALEATORIA',
            pix_key: '0ff71ee6-c9d0-4b90-b66d-36a8619a807e',
            name: "Alberto",
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toHaveLength(0);
    });
    
    test('inválido nome', () => {
        const recebedor = {
            pix_key_type: 'CHAVE_ALEATORIA',
            pix_key: '0ff71ee6-c9d0-4b90-b66d-36a8619a807e',
            name: "",
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toEqual(['O nome deve ser preenchido.'])
    });
    
    test('inválido cpf ou cnpj', () => {
        const recebedor = {
            pix_key_type: 'CHAVE_ALEATORIA',
            pix_key: '0ff71ee6-c9d0-4b90-b66d-36a8619a807e',
            name: "Alberto",
            cpf: '12.345.678/9876-5',
        }
        expect(validateRecebedor(recebedor)).toEqual(['CPF ou CNPJ inválidos.'])
    });
    
    test('inválido email', () => {
        const recebedor = {
            pix_key_type: 'CHAVE_ALEATORIA',
            pix_key: '0ff71ee6-c9d0-4b90-b66d-36a8619a807e',
            name: "Alberto",
            email: 'ALBERTO#BOL.COM',
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toEqual(['Email inválido.'])
    });
    
    test('inválido chave pix', () => {
        const recebedor = {
            pix_key_type: 'CHAVE_ALEATORIA',
            pix_key: '0ff71ee6-c9d0-4b90-b66d-36a8619a807',
            name: "Alberto",
            email: 'ALBERTO@BOL.COM',
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toEqual(['Chave PIX inválida.'])
    });
    
    test('inválido tipo chave pix', () => {
        const recebedor = {
            pix_key_type: 'ALBERTO_PIX',
            pix_key: '+5512934567890',
            name: "Alberto",
            email: 'ALBERTO@BOL.COM',
            cpf: '12.345.678/9876-54',
        }
        expect(validateRecebedor(recebedor)).toEqual(['Tipo da chave PIX inválido.'])
    });

    test('inválido multi erros', () => {
        const recebedor = {
            pix_key_type: 'EMAIL',
            pix_key: '+5512934567890',
            name: "",
            email: 'ALBERTO#BOL.COM',
            cpf: '12.345.678/9876',
        }
        expect(validateRecebedor(recebedor)).toEqual([
            "Chave PIX inválida.",
            "O nome deve ser preenchido.",
            "Email inválido.",
            "CPF ou CNPJ inválidos.",
        ]);
    });
});
