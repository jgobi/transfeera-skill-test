import { createRecebedorDAL, deleteRecebedorDAL, editRecebedorDAL, getPixKeyTypeIdDAL, getRecebedorDAL, listRecebedorDAL } from "../dal/recebedor.js";

const ITEMS_PER_LIST_PAGE = +process.env.ITEMS_PER_LIST_PAGE;

export function listRecebedor (page, q) {
    const limit = ITEMS_PER_LIST_PAGE;
    const offset = Math.max(0, ITEMS_PER_LIST_PAGE * (page - 1));

    const { count, items } = listRecebedorDAL(limit, offset, q);

    return {
        limit,
        offset,
        count,
        items,
    }
}

export function getRecebedor (id) {
    return getRecebedorDAL(id);
}

export function createRecebedor ({ name, cpf, email, pixKey, pixKeyType }) {
    const pixKeyTypeId = getPixKeyTypeIdDAL(pixKeyType);
    if (!pixKeyTypeId) throw new Error('Tipo da chave PIX não encontrado no banco de dados.');

    createRecebedorDAL({ name, cpf, email, pixKey, pixKeyTypeId });
}

export function deleteRecebedor (ids) {
    deleteRecebedorDAL(ids);
}

export function editRecebedor({ id, pixKeyType, pixKey, email, name, cpf }) {
    return editRecebedorDAL({ id, pixKeyType, pixKey, email, name, cpf});
}