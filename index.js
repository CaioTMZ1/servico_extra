import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", serviceRoutes);

// Porta
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}/api/services`);
});
