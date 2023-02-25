import './env.js'

import { faker } from '@faker-js/faker';
import { randomInt, randomUUID } from 'crypto';
import { getSystemDatabase } from './database.js';

function generateUnsafeCpf() {
    return `${
        Array(3).fill(0).map(() => faker.random.numeric(3, { allowLeadingZeros: true })).join('.')
    }-${faker.random.numeric(2, { allowLeadingZeros: true })}`;
}

function generateUnsafeCnpj() {
    return `${faker.random.numeric(2, { allowLeadingZeros: true })}.${
        Array(2).fill(0).map(() => faker.random.numeric(3, { allowLeadingZeros: true })).join('.')
    }/${faker.random.numeric(4, { allowLeadingZeros: true })}-${faker.random.numeric(2, { allowLeadingZeros: true })}`;
}

function generatePixKey() {
    const keyType = randomInt(1, 6);
    switch (keyType) {
        case 1:
            return [1, generateUnsafeCpf()];
        case 2:
            return [2, generateUnsafeCnpj()];
        case 3:
            return [3, faker.internet.email()];
        case 4:
            return [4, faker.phone.number("+55##9########")];
        default:
            return [5, randomUUID()]
    }
}

function main () {
    const recebedores = Array(30).fill(0).map(() => {
        const [pixKeyTypeId, pixKey] = generatePixKey();
        return [
            faker.name.fullName(), // nome
            Math.random() < 0.5 ? generateUnsafeCpf() : generateUnsafeCnpj(), // cpj / cnpj
            faker.internet.email(), // email
            pixKeyTypeId, // id_tipo_chave_pix
            pixKey, // chave_pix
            +(Math.random() < 0.5), // validado
        ]
    });

    const sdb = getSystemDatabase(); // create database
    const insertStmt = sdb.prepare(`insert into recebedor (nome, cpf, email, id_tipo_chave_pix, chave_pix, validado) values (?, ?, ?, ?, ?, ?)`);
    for (const r of recebedores) {
        insertStmt.run(r);
    }
    sdb.close();
    console.log("Done.");
}

main();