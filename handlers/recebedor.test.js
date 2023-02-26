import '../env.js';

import { jest } from '@jest/globals'
import { HTTPError } from './_helpers.js';
const dal = {
    listRecebedorDAL: jest.fn(),
    getRecebedorDAL: jest.fn(),
    getPixKeyTypeIdDAL: jest.fn(),
    createRecebedorDAL: jest.fn(),
    deleteRecebedorDAL: jest.fn(),
    editRecebedorDAL: jest.fn(),
}
jest.unstable_mockModule('../dal/recebedor.js', () => dal);

beforeEach(() => {
    jest.clearAllMocks();
});

describe('buscar recebedor por id', () => {
    test('recebedor existe', async () => {
        dal.getRecebedorDAL.mockReturnValue({
            id: 1,
            nome: 'Alberto',
            cpf: '897.132.543-23',
            email: 'ALBERTO@BOL.COM',
            id_tipo_chave_pix: 1,
            tipo_chave_pix: 'CPF',
            chave_pix: '897.132.543-23',
            validado: 0,
        });

        const { getRecebedorHandler } = await import('./recebedor.js');
        return expect(getRecebedorHandler({ params: { id: 1 } })).toEqual({
            id: 1,
            nome: 'Alberto',
            cpf: '897.132.543-23',
            email: 'ALBERTO@BOL.COM',
            idTipoChavePix: 1,
            tipoChavePix: 'CPF',
            chavePix: '897.132.543-23',
            validado: false,
        });
    });

    test('recebedor não existe', async () => {
        dal.getRecebedorDAL.mockReturnValue(undefined);

        const { getRecebedorHandler } = await import('./recebedor.js');
        return expect(() => getRecebedorHandler({ params: { id: 1 } })).toThrowError(HTTPError);
    });
});

describe('listar recebedores', () => {
    test('lista', async () => {
        dal.listRecebedorDAL.mockReturnValue({
            count: 11,
            items: [{
                id: 1,
                nome: 'Zalberto',
                cpf: '897.132.543-21',
                email: 'ALBERTO@BOL.COM',
                id_tipo_chave_pix: 1,
                tipo_chave_pix: 'CPF',
                chave_pix: '897.132.543-21',
                validado: 0,
            }]
        });

        const { listRecebedorHandler } = await import('./recebedor.js');
        return expect(listRecebedorHandler({ query: { page: '2' } })).toEqual({
            page: 2,
            count: 11,
            offset: 10,
            limit: +process.env.ITEMS_PER_LIST_PAGE,
            items: [{
                id: 1,
                nome: 'Zalberto',
                cpf: '897.132.543-21',
                email: 'ALBERTO@BOL.COM',
                idTipoChavePix: 1,
                tipoChavePix: 'CPF',
                chavePix: '897.132.543-21',
                validado: false,
            }]
        });
    });
    
    test('lista página inválida', async () => {
        dal.listRecebedorDAL.mockReturnValue({
            count: 0,
            items: []
        });

        const { listRecebedorHandler } = await import('./recebedor.js');
        return expect(listRecebedorHandler({ query: { page: 'asdf' } })).toEqual({
            page: 1,
            count: 0,
            offset: 0,
            limit: +process.env.ITEMS_PER_LIST_PAGE,
            items: []
        });
    });
});

describe('criar recebedor', () => {
    beforeEach(() => {
        dal.getPixKeyTypeIdDAL.mockImplementation((t) => t === 'CPF' ? 1 : undefined);
        dal.createRecebedorDAL.mockReturnValue({ info: { changes: 1, lastInsertRowid: 1 } });
    });

    test('válido', async () => {
        const { createRecebedorHandler } = await import('./recebedor.js');
        expect(createRecebedorHandler({
            body: {
                pix_key_type: 'CPF',
                pix_key: '123.456.789-00',
                email: 'ALBERTO@BOL.COM',
                name: 'Alberto',
                cpf: '123.456.789-00',
            }
        })).toEqual(undefined);

        expect(dal.createRecebedorDAL).toBeCalledTimes(1);
    });

    test('válido sem email', async () => {
        const { createRecebedorHandler } = await import('./recebedor.js');
        expect(createRecebedorHandler({
            body: {
                pix_key_type: 'CPF',
                pix_key: '123.456.789-00',
                email: '',
                name: 'Alberto',
                cpf: '123.456.789-00',
            }
        })).toEqual(undefined);

        expect(dal.createRecebedorDAL).toBeCalledTimes(1);
    });

    test('inválido', async () => {
        const { createRecebedorHandler } = await import('./recebedor.js');
        expect(() => createRecebedorHandler({
            body: {
                pix_key_type: 'CPF',
                pix_key: '12.345.789/0000-12',
                email: 'ALBERTO@BOL.COM',
                name: 'Alberto',
                cpf: '123.456.789-00',
            }
        })).toThrowError(HTTPError);

        expect(dal.createRecebedorDAL).toBeCalledTimes(0);
    });
});

describe('deletar recebedor', () => {
    beforeEach(() => {
        dal.deleteRecebedorDAL.mockReturnValue({ info: { changes: 1, lastInsertRowid: 0 } });
    });

    test('válido 1 ítem', async () => {
        const { deleteRecebedorHandler } = await import('./recebedor.js');
        expect(deleteRecebedorHandler({
            body: {
                ids: [12],
            }
        })).toEqual(undefined);

        expect(dal.deleteRecebedorDAL).toBeCalledTimes(1);
    });

    test('válido 3 ítens', async () => {
        const { deleteRecebedorHandler } = await import('./recebedor.js');
        expect(deleteRecebedorHandler({
            body: {
                ids: [12, 13, 31],
            }
        })).toEqual(undefined);

        expect(dal.deleteRecebedorDAL).toBeCalledTimes(1);
    });

    test('inválido', async () => {
        const { deleteRecebedorHandler } = await import('./recebedor.js');
        expect(() => deleteRecebedorHandler({
            body: {
                ids: [],
            }
        })).toThrowError(HTTPError);

        expect(dal.deleteRecebedorDAL).toBeCalledTimes(0);
    });
});


describe('editar recebedor', () => {

    test('válido', async () => {
        dal.editRecebedorDAL.mockReturnValue(true);

        const { editRecebedorHandler } = await import('./recebedor.js');
        expect(editRecebedorHandler({
            body: {
                id: 1,
                pix_key_type: 'CPF',
                pix_key: '987.654.321-00',
                email: 'ALBERTO51@BOL.COM',
                name: 'Alberto',
                cpf: '123.456.789-00',
            }
        })).toEqual(undefined);

        expect(dal.editRecebedorDAL).toBeCalledTimes(1);
    });

    test('inválido id', async () => {
        dal.editRecebedorDAL.mockReturnValue(false);

        const { editRecebedorHandler } = await import('./recebedor.js');
        expect(() => editRecebedorHandler({
            body: {
                id: 1,
                pix_key_type: 'CPF',
                pix_key: '987.654.321-00',
                email: 'ALBERTO51@BOL.COM',
                name: 'Alberto',
                cpf: '123.456.789-00',
            }
        })).toThrowError(HTTPError);

        expect(dal.editRecebedorDAL).toBeCalledTimes(1);
    });

    test('inválido corpo', async () => {
        const { editRecebedorHandler } = await import('./recebedor.js');
        expect(() => editRecebedorHandler({
            body: {
                id: 1,
                pix_key_type: 'CHAVE_ALEATORIA',
                pix_key: '987.654.321-00',
                email: 'ALBERTO51@BOL.COM',
                name: 'Alberto',
                cpf: '123.456.789-00',
            }
        })).toThrowError(HTTPError);

        expect(dal.editRecebedorDAL).toBeCalledTimes(0);
    });
});
