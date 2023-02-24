import { readFileSync } from 'fs';
import Database from 'better-sqlite3';
let sdb = null;

/**
 * 
 * @returns {import('better-sqlite3').Database}
 */
export function getSystemDatabase() {
    if (!sdb) sdb = connectMigrate();
    return sdb;
}

function connectMigrate() {
    const sdb = new Database(process.env.SYSTEM_DATABASE_FILE);
    sdb.pragma('journal_mode = WAL');
    
    const sql = readFileSync('./setup.sql', 'utf-8')
    sdb.exec(sql);

    return sdb;
}
