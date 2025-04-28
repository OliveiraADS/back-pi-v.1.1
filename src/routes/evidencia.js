// ================ routes/evidencia.js ================
const express = require('express');
const router = express.Router();
// Importar o controlador
const evidenciaController = require('../controllers/evidenciaController');

// Rotas para CRUD básico
router.post('/', evidenciaController.criarEvidencia);
router.get('/', evidenciaController.listarEvidencias);
router.get('/:id', evidenciaController.buscarEvidenciaPorId);
router.put('/:id', evidenciaController.atualizarEvidencia);
router.delete('/:id', evidenciaController.excluirEvidencia);

// Rota para buscar evidências por ID do caso
router.get('/caso/:idCaso', evidenciaController.buscarEvidenciasPorCaso);

// Rotas para adicionar elementos às evidências
router.put('/:id/radiografia', evidenciaController.adicionarRadiografia);
router.put('/:id/odontograma', evidenciaController.adicionarOdontograma);
router.put('/:id/documento', evidenciaController.adicionarDocumento);

// Rotas para remover elementos das evidências
router.delete('/:id/radiografia/:radiografiaId', evidenciaController.removerRadiografia);
router.delete('/:id/odontograma/:odontogramaId', evidenciaController.removerOdontograma);
router.delete('/:id/documento/:documentoId', evidenciaController.removerDocumento);

// Exportar o router
module.exports = router;