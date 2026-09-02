require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const producaoRoutes = require('./src/routes/producao.routes');

app.use('/producao', producaoRoutes);


const produtoRoutes = require('./src/routes/produto.routes');

app.use('/produto', produtoRoutes);


const usuarioRoutes = require('./src/routes/usuario.routes');

app.use('/usuario', usuarioRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
