// routes/evidencia.js
const express = require('express');
const router = express.Router();
const evidenciaController = require('../controllers/evidenciaController');

// Rotas básicas CRUD
router.post('/', evidenciaController.criarEvidencia);
router.get('/', evidenciaController.listarEvidencias);
router.get('/:id', evidenciaController.obterEvidencia);
router.put('/:id', evidenciaController.atualizarEvidencia);
router.delete('/:id', evidenciaController.excluirEvidencia);

// Rotas adicionais
router.get('/caso/:id_caso', evidenciaController.obterEvidenciasPorCaso);
router.post('/multiplas', evidenciaController.criarMultiplasEvidencias);

module.exports = router;