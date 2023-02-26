import { createRecebedorDAL, deleteRecebedorDAL, editRecebedorDAL, getPixKeyTypeIdDAL, getRecebedorDAL, listRecebedorDAL } from "../dal/recebedor.js";

const ITEMS_PER_LIST_PAGE = +process.env.ITEMS_PER_LIST_PAGE;

function prepareRecebedor (r) {
    return {
        id: r.id,
        nome: r.nome,
        cpf: r.cpf,
        email: r.email,
        idTipoChavePix: r.id_tipo_chave_pix,
        tipoChavePix: r.tipo_chave_pix,
        chavePix: r.chave_pix,
        validado: !!r.validado,
    }
}

export function listRecebedor (page, q) {
    const limit = ITEMS_PER_LIST_PAGE;
    const offset = Math.max(0, ITEMS_PER_LIST_PAGE * (page - 1));

    const { count, items } = listRecebedorDAL(limit, offset, q);

    return {
        limit,
        offset,
        count,
        items: items.map(prepareRecebedor),
    }
}

export function getRecebedor (id) {
    const recebedor = getRecebedorDAL(id);
    if (!recebedor) return null;
    return prepareRecebedor(recebedor);
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
