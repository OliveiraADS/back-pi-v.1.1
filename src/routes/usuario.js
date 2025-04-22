const express = require('express');
const router = express.Router();
// Adicione esta linha para importar o controlador
const usuarioController = require('../controllers/usuarioController');

// Rotas existentes
router.post('/', usuarioController.cadastrarUsuario);
router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obterUsuario);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.excluirUsuario);

// Nova rota para atualizar foto
router.put('/:id/foto', usuarioController.atualizarFotoPerfil);
router.get('/tipo/:tipo_perfil', usuarioController.listarUsuariosPorTipoPerfil);

module.exports = router;