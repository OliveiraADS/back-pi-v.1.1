// routes/evidencia.js
const express = require('express');
const router = express.Router();
const evidenciaController = require('../controllers/evidenciaController');

// IMPORTANTE: Rotas específicas ANTES das rotas com parâmetros (:id)
// Rota para excluir todas as evidências (Limpar tabela)
router.delete('/limpar-tudo', evidenciaController.excluirTodasEvidencias);

// Rotas adicionais específicas
router.get('/caso/:id_caso', evidenciaController.obterEvidenciasPorCaso);
router.post('/multiplas', evidenciaController.criarMultiplasEvidencias);

// Rotas básicas CRUD com parâmetros
router.post('/', evidenciaController.criarEvidencia);
router.get('/', evidenciaController.listarEvidencias);
router.get('/:id', evidenciaController.obterEvidencia);
router.put('/:id', evidenciaController.atualizarEvidencia);
router.delete('/:id', evidenciaController.excluirEvidencia);

module.exports = router;