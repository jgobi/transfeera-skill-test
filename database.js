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

    sdb.exec('CREATE TABLE IF NOT EXISTS meta_migration ( "migrated" INTEGER NOT NULL DEFAULT 0 )');

    const stmts = {
        checkMigration: sdb.prepare('select count(migrated) as migrated from meta_migration where migrated = 1'),
        saveMigration: sdb.prepare('insert into meta_migration values (1)'),
    }
    
    const { migrated } = stmts.checkMigration.get()
    
    if (!migrated) {
        const sql = readFileSync('./setup.sql', 'utf-8')
        sdb.exec(sql);
        stmts.saveMigration.run();
    }

    return sdb;
}
