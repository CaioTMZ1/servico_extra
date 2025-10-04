import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();

// Middlewares
app.use(cors());            // habilita CORS (acesso do frontend)
app.use(express.json());    // permite trabalhar com JSON no body

// Rotas
app.use("/api", serviceRoutes);

// Porta
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/api/services`);
});
