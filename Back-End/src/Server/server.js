
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import usuarioRoutes from "../routes/usuarioRoutes.js";
import receitaRoutes from "../routes/receitaRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuario", usuarioRoutes);
app.use("/receitas", receitaRoutes);

// A rota de favoritos será adicionada quando seu arquivo de rotas estiver pronto.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
