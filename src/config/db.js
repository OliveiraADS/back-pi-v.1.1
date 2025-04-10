// ================ config/db.js ================
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://odontolegal:odontolegal123@odonto-legal.bllxerk.mongodb.net/?retryWrites=true&w=majority&appName=odonto-legal', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;