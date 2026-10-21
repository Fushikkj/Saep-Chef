import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import router from "../Routes/usuarioRoutes.js";

//const receitaRoutes = import ("../Routes/")
//const receitasRoutes = require("./routes/receitas");

//A importação está em Commonjs, o projeto usa ESModule(import). Não existe o arquivo do routes para receitas.


const app = express();

app.use(cors());
app.use(express.json());


app.use("/usuario", router);
//app.use("/receitas", receitasRoutes);
//app.use("/favoritos", favoritosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
