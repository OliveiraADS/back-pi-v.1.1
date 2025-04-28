//src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Importando as rotas
const usuarioRoutes = require('./routes/usuario');
const authRoutes = require('./routes/auth');
const casoRoutes = require('./routes/caso');
// Nova importação para as rotas de evidência
const evidenciaRoutes = require('./routes/evidencia');

// Carregar variavel de ambiente
dotenv.config();

// Connect banco de dados
connectDB();

// Inicializando o app
const app = express();

// Middleware
app.use(cors());

// Aumentar o limite para permitir imagens em base64
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Usando as rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/casos', casoRoutes);
// Adicionar as novas rotas de evidência
app.use('/api/evidencias', evidenciaRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});