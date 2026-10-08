const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuarios');
const receitasRoutes = require('./routes/receitas');
const favoritosRoutes = require('./routes/favoritos');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/usuarios', usuariosRoutes);
app.use('/receitas', receitasRoutes);
app.use('/favoritos', favoritosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});