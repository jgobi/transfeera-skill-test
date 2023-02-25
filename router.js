import bodyParser from 'body-parser';
import express from 'express';
import { createRecebedorHandler, deleteRecebedorHandler, editRecebedorHandler, getRecebedorHandler, listRecebedorHandler } from './handlers/recebedor.js';
import { basicHandlerSync } from './handlers/_helpers.js';
const router = express.Router();
router.use(bodyParser.json());

router.get('/recebedor', basicHandlerSync(listRecebedorHandler));
router.get('/recebedor/:id', basicHandlerSync(getRecebedorHandler));
router.post('/recebedor', basicHandlerSync(createRecebedorHandler));
router.put('/recebedor', basicHandlerSync(editRecebedorHandler));
router.delete('/recebedor', basicHandlerSync(deleteRecebedorHandler));

export default router;