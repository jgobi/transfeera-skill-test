import './env.js'

import express from 'express';
import router from './router.js';

import { getSystemDatabase } from './database.js';
const sdb = getSystemDatabase(); // create database
// close the databases when exiting
process.on('exit', () => { sdb.close(); pdb.close(); });
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));

// main
const app = express();

app.use('/api', router);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
