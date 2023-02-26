import { getSystemDatabase } from '../database.js';

const sdb = getSystemDatabase();
const stmts = {
    countRecebedor: sdb.prepare(`select count(r.id) as "count" from recebedor r where r.nome like ('%' || :q || '%') or r.validado = :qv or r.id_tipo_chave_pix = :qt or r.chave_pix like ('%' || :q || '%')`),
    listRecebedor: sdb.prepare(`select r.*, t.nome as tipo_chave_pix from recebedor r join tipo_chave_pix t on r.id_tipo_chave_pix = t.id where r.nome like ('%' || :q || '%') or r.validado = :qv or r.id_tipo_chave_pix = :qt or r.chave_pix like ('%' || :q || '%') order by r.nome limit :limit offset :offset`),
    listTipoChavePix: sdb.prepare(`select nome, id from tipo_chave_pix`),
    createRecebedor: sdb.prepare('insert into recebedor (nome, cpf, email, id_tipo_chave_pix, chave_pix) values (?, ?, ?, ?, ?)'),
    getIdTipoChavePix: sdb.prepare('select id from tipo_chave_pix where nome = ?'),
    deleteRecebedor: sdb.prepare('delete from recebedor where id = ?'),
    getRecebedor: sdb.prepare('select r.*, t.nome as tipo_chave_pix from recebedor r join tipo_chave_pix t on r.id_tipo_chave_pix = t.id where r.id = ?'),
    updateRecebedorEmail: sdb.prepare('update recebedor set email=? where id=?'),
    updateRecebedor: sdb.prepare('update recebedor set nome=?, cpf=?, email=?, id_tipo_chave_pix=?, chave_pix=? where id=?'),
};

const STATUS_MAP = new Map([['validado', 1], ['rascunho', 0]]);

export const listRecebedorDAL = sdb.transaction((limit, offset, q) => {
    const tipoChavePix = new Map(stmts.listTipoChavePix.raw(true).all());
    const qt = tipoChavePix.get(q) ?? null;
    const qv = STATUS_MAP.get(q.toLowerCase()) ?? null;
    const { count } = stmts.countRecebedor.get({ q, qv, qt });

    let items = [];
    if (count > offset) {
        items = stmts.listRecebedor.all({ q, qv, qt, limit, offset });
    }

    return {
        count,
        items,
    };
});

export function getRecebedorDAL (id) {
    const recebedor = stmts.getRecebedor.get(id);
    if (!recebedor) {
        return null;
    }
    return recebedor;
}

export function getPixKeyTypeIdDAL (pixKeyType) {
    return stmts.getIdTipoChavePix.get(pixKeyType)?.id;
}

export function createRecebedorDAL ({ name, cpf, email, pixKey, pixKeyTypeId }) {
    return stmts.createRecebedor.run(name, cpf, email, pixKeyTypeId, pixKey);
}

export const deleteRecebedorDAL = sdb.transaction((ids) => {
    for (const id of ids) {
        stmts.deleteRecebedor.run(id);
    }
});

// Esta função erroneamente implementa regras de negócio para facilitar a utilização das
// transactions do SQLite neste exercício de programação. Em um sistema real, parte deste
// código seria movido para dentro do respectivo controller.
export const editRecebedorDAL = sdb.transaction(({ id, pixKeyType, pixKey, email, name, cpf }) => {
    const recebedor = stmts.getRecebedor.get(id);
    if (!recebedor) return false;
    if (recebedor.validado) {
        stmts.updateRecebedorEmail.run(email, id);
    } else {
        const pixKeyTypeId = getPixKeyTypeIdDAL(pixKeyType);
        if (!pixKeyTypeId) throw new Error('Tipo da chave PIX não encontrado no banco de dados.');
        stmts.updateRecebedor.run(name, cpf, email, pixKeyTypeId, pixKey, id);
    }
    return true;
});
