import { createRecebedor, deleteRecebedor, editRecebedor, getRecebedor, listRecebedor } from '../controllers/recebedor.js';
import { validateRecebedor } from '../validations/recebedor.js';
import { HTTPError } from './_helpers.js';

/** @type {import('./handlers').BasicHandlerSync} */
export function listRecebedorHandler (req) {
    const q = req.query.q || '';
    const page = Math.max(+req.query.page || 0, 1);

    const { items, offset, limit, count } = listRecebedor(page, q);
    return {
        page,
        count,
        offset,
        limit,
        items,
    };
}

/** @type {import('./handlers').BasicHandlerSync} */
export function getRecebedorHandler (req) {
    const { id } = req.params;

    const recebedor = getRecebedor(id);
    if (!recebedor) throw new HTTPError(400, 'Recebedor não encontrado.');
    return recebedor;
}

/** @type {import('./handlers').BasicHandlerSync} */
export function createRecebedorHandler (req) {
    const { pix_key_type, pix_key, email, name, cpf } = req.body;

    const errors = validateRecebedor({ pix_key_type, pix_key, email, name, cpf });

    if (errors.length > 0) {
        throw new HTTPError(400, errors.join('\n'));
    }

    createRecebedor({ name, cpf, email, pixKey: pix_key, pixKeyType: pix_key_type });
}

/** @type {import('./handlers').BasicHandlerSync} */
export function deleteRecebedorHandler (req) {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length < 1) {
        throw new HTTPError(400, 'É necessário informar ao menos um id de recebedor a ser excluído no campo "ids".')
    }
    deleteRecebedor(ids);
}

/** @type {import('./handlers').BasicHandlerSync} */
export function editRecebedorHandler (req) {
    const { id, pix_key_type, pix_key, email, name, cpf } = req.body;

    if (!id) {
        throw new HTTPError(400, 'É necessário fornecer o id do recebedor a ser editado.')
    }

    const errors = validateRecebedor({ pix_key_type, pix_key, email, name, cpf })
    if (errors.length > 0) {
        throw new HTTPError(400, errors.join('\n'));
    }

    const success = editRecebedor({ id, pixKeyType: pix_key_type, pixKey: pix_key, email, name, cpf });
    if (!success) throw new HTTPError(400, "Recebedor não encontrado.");
}
