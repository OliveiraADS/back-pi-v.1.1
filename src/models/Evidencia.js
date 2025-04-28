// ================ models/Evidencia.js ================
// Importando o mongoose para criar o schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o schema da evidência
const EvidenciaSchema = new Schema({
  // ID do caso relacionado a esta evidência
  id_caso: {
    type: Number,
    required: [true, 'ID do caso é obrigatório'],
    ref: 'Caso' // Referência à coleção Caso
  },
  
  // Campos de endereço
  rua: {
    type: String,
    trim: true // Remove espaços em branco no início e fim
  },
  bairro: {
    type: String,
    trim: true
  },
  cep: {
    type: String,
    trim: true
  },
  numero: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    trim: true
  },
  cidade: {
    type: String,
    trim: true
  },
  
  // Data de criação da evidência
  data_criacao_evidencia: {
    type: Date,
    default: Date.now // Valor padrão é a data atual
  },
  
  // Array de radiografias - permite múltiplas imagens
  radiografias_evidencia: [{
    imagem: {
      type: String, // Armazena a imagem como String Base64
      required: [true, 'Imagem da radiografia é obrigatória']
    },
    observacao: {
      type: String,
      default: '' // Valor padrão é string vazia
    },
    data_criacao: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Array de odontogramas - permite múltiplas imagens
  odontogramas_evidencia: [{
    imagem: {
      type: String, // Armazena a imagem como String Base64
      required: [true, 'Imagem do odontograma é obrigatória']
    },
    observacao: {
      type: String,
      default: ''
    },
    data_criacao: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Array de documentos - permite múltiplos documentos
  documentos_evidencia: [{
    arquivo: {
      type: String, // Armazena o arquivo como String Base64
      required: [true, 'Arquivo de documento é obrigatório']
    },
    tipo: {
      type: String, // Tipo do documento (PDF, imagem, etc.)
      default: 'PDF'
    },
    nome: {
      type: String, // Nome original do arquivo
      default: 'Documento'
    },
    observacao: {
      type: String,
      default: ''
    },
    data_criacao: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Data de atualização da evidência
  data_atualizacao: {
    type: Date,
    default: Date.now
  }
});

// Middleware para atualizar a data_atualizacao sempre que o documento for modificado
EvidenciaSchema.pre('findOneAndUpdate', function(next) {
  this.set({ data_atualizacao: Date.now() });
  next();
});

// Exportando o modelo
module.exports = mongoose.model('Evidencia', EvidenciaSchema);