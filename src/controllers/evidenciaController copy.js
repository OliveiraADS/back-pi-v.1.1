// ================ controllers/evidenciaController.js ================
// Importando o modelo de Evidencia
const Evidencia = require('../models/Evidencia');
const Caso = require('../models/Caso');

// @desc    Criar nova evidência
// @route   POST /api/evidencias
// @access  Public
exports.criarEvidencia = async (req, res) => {
  try {
    // Extraindo os dados do corpo da requisição
    const { 
      id_caso, 
      rua, 
      bairro, 
      cep, 
      numero, 
      estado, 
      cidade,
      radiografias_evidencia,
      odontogramas_evidencia,
      documentos_evidencia
    } = req.body;
    
    // Verificar se o caso existe
    const casoExistente = await Caso.findOne({ id_caso });
    
    if (!casoExistente) {
      return res.status(404).json({ 
        sucesso: false, 
        mensagem: 'Caso não encontrado' 
      });
    }
    
    // Criar a evidência
    const evidencia = await Evidencia.create({
      id_caso,
      rua,
      bairro,
      cep,
      numero,
      estado,
      cidade,
      radiografias_evidencia: radiografias_evidencia || [], // Se não informado, cria array vazio
      odontogramas_evidencia: odontogramas_evidencia || [],
      documentos_evidencia: documentos_evidencia || []
    });
    
    // Retornar a resposta de sucesso
    res.status(201).json({
      sucesso: true,
      mensagem: 'Evidência criada com sucesso',
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(400).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Listar todas as evidências
// @route   GET /api/evidencias
// @access  Public
exports.listarEvidencias = async (req, res) => {
  try {
    // Buscar todas as evidências no banco de dados
    const evidencias = await Evidencia.find();
    
    // Retornar a lista de evidências
    res.status(200).json({
      sucesso: true,
      contagem: evidencias.length,
      dados: evidencias
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Buscar evidência por ID
// @route   GET /api/evidencias/:id
// @access  Public
exports.buscarEvidenciaPorId = async (req, res) => {
  try {
    // Buscar evidência pelo ID
    const evidencia = await Evidencia.findById(req.params.id);
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Retornar a evidência encontrada
    res.status(200).json({
      sucesso: true,
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Buscar evidências por ID do caso
// @route   GET /api/evidencias/caso/:idCaso
// @access  Public
exports.buscarEvidenciasPorCaso = async (req, res) => {
  try {
    // Extrair o ID do caso da URL
    const { idCaso } = req.params;
    
    // Buscar evidências com o ID do caso especificado
    const evidencias = await Evidencia.find({ id_caso: idCaso });
    
    // Verificar se foram encontradas evidências
    if (evidencias.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Nenhuma evidência encontrada para este caso'
      });
    }
    
    // Retornar as evidências encontradas
    res.status(200).json({
      sucesso: true,
      contagem: evidencias.length,
      dados: evidencias
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Atualizar evidência
// @route   PUT /api/evidencias/:id
// @access  Public
exports.atualizarEvidencia = async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const { 
      rua, 
      bairro, 
      cep, 
      numero, 
      estado, 
      cidade
    } = req.body;
    
    // Dados para atualização
    const dadosAtualizados = {
      rua,
      bairro,
      cep,
      numero,
      estado,
      cidade
    };
    
    // Buscar e atualizar a evidência
    const evidencia = await Evidencia.findByIdAndUpdate(
      req.params.id,
      dadosAtualizados,
      { new: true, runValidators: true } // Retornar o documento atualizado e validar os dados
    );
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Retornar a evidência atualizada
    res.status(200).json({
      sucesso: true,
      mensagem: 'Evidência atualizada com sucesso',
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Adicionar radiografia à evidência
// @route   PUT /api/evidencias/:id/radiografia
// @access  Public
exports.adicionarRadiografia = async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const { imagem, observacao } = req.body;
    
    // Verificar se a imagem foi enviada
    if (!imagem) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Imagem da radiografia é obrigatória'
      });
    }
    
    // Buscar a evidência pelo ID
    const evidencia = await Evidencia.findById(req.params.id);
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Adicionar a nova radiografia ao array
    evidencia.radiografias_evidencia.push({
      imagem,
      observacao: observacao || '',
      data_criacao: Date.now()
    });
    
    // Salvar as alterações
    await evidencia.save();
    
    // Retornar a evidência atualizada
    res.status(200).json({
      sucesso: true,
      mensagem: 'Radiografia adicionada com sucesso',
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Adicionar odontograma à evidência
// @route   PUT /api/evidencias/:id/odontograma
// @access  Public
exports.adicionarOdontograma = async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const { imagem, observacao } = req.body;
    
    // Verificar se a imagem foi enviada
    if (!imagem) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Imagem do odontograma é obrigatória'
      });
    }
    
    // Buscar a evidência pelo ID
    const evidencia = await Evidencia.findById(req.params.id);
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Adicionar o novo odontograma ao array
    evidencia.odontogramas_evidencia.push({
      imagem,
      observacao: observacao || '',
      data_criacao: Date.now()
    });
    
    // Salvar as alterações
    await evidencia.save();
    
    // Retornar a evidência atualizada
    res.status(200).json({
      sucesso: true,
      mensagem: 'Odontograma adicionado com sucesso',
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Adicionar documento à evidência
// @route   PUT /api/evidencias/:id/documento
// @access  Public
exports.adicionarDocumento = async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const { arquivo, tipo, nome, observacao } = req.body;
    
    // Verificar se o arquivo foi enviado
    if (!arquivo) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Arquivo do documento é obrigatório'
      });
    }
    
    // Buscar a evidência pelo ID
    const evidencia = await Evidencia.findById(req.params.id);
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Adicionar o novo documento ao array
    evidencia.documentos_evidencia.push({
      arquivo,
      tipo: tipo || 'PDF',
      nome: nome || 'Documento',
      observacao: observacao || '',
      data_criacao: Date.now()
    });
    
    // Salvar as alterações
    await evidencia.save();
    
    // Retornar a evidência atualizada
    res.status(200).json({
      sucesso: true,
      mensagem: 'Documento adicionado com sucesso',
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Excluir evidência
// @route   DELETE /api/evidencias/:id
// @access  Public
exports.excluirEvidencia = async (req, res) => {
  try {
    // Buscar e excluir a evidência
    const evidencia = await Evidencia.findByIdAndDelete(req.params.id);
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Retornar mensagem de sucesso
    res.status(200).json({
      sucesso: true,
      mensagem: 'Evidência excluída com sucesso'
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Remover radiografia específica da evidência
// @route   DELETE /api/evidencias/:id/radiografia/:radiografiaId
// @access  Public
exports.removerRadiografia = async (req, res) => {
  try {
    // Extrair os IDs da URL
    const { id, radiografiaId } = req.params;
    
    // Buscar a evidência pelo ID
    const evidencia = await Evidencia.findById(id);
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Remover a radiografia do array
    evidencia.radiografias_evidencia = evidencia.radiografias_evidencia.filter(
      radiografia => radiografia._id.toString() !== radiografiaId
    );
    
    // Salvar as alterações
    await evidencia.save();
    
    // Retornar a evidência atualizada
    res.status(200).json({
      sucesso: true,
      mensagem: 'Radiografia removida com sucesso',
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Remover odontograma específico da evidência
// @route   DELETE /api/evidencias/:id/odontograma/:odontogramaId
// @access  Public
exports.removerOdontograma = async (req, res) => {
  try {
    // Extrair os IDs da URL
    const { id, odontogramaId } = req.params;
    
    // Buscar a evidência pelo ID
    const evidencia = await Evidencia.findById(id);
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Remover o odontograma do array
    evidencia.odontogramas_evidencia = evidencia.odontogramas_evidencia.filter(
      odontograma => odontograma._id.toString() !== odontogramaId
    );
    
    // Salvar as alterações
    await evidencia.save();
    
    // Retornar a evidência atualizada
    res.status(200).json({
      sucesso: true,
      mensagem: 'Odontograma removido com sucesso',
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};

// @desc    Remover documento específico da evidência
// @route   DELETE /api/evidencias/:id/documento/:documentoId
// @access  Public
exports.removerDocumento = async (req, res) => {
  try {
    // Extrair os IDs da URL
    const { id, documentoId } = req.params;
    
    // Buscar a evidência pelo ID
    const evidencia = await Evidencia.findById(id);
    
    // Verificar se a evidência foi encontrada
    if (!evidencia) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Evidência não encontrada'
      });
    }
    
    // Remover o documento do array
    evidencia.documentos_evidencia = evidencia.documentos_evidencia.filter(
      documento => documento._id.toString() !== documentoId
    );
    
    // Salvar as alterações
    await evidencia.save();
    
    // Retornar a evidência atualizada
    res.status(200).json({
      sucesso: true,
      mensagem: 'Documento removido com sucesso',
      dados: evidencia
    });
    
  } catch (error) {
    // Em caso de erro, retornar mensagem de erro
    res.status(500).json({
      sucesso: false,
      mensagem: error.message
    });
  }
};