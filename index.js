import express from "express";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();
app.use(express.json());

// rotas
app.use("/api", serviceRoutes);

// porta
app.listen(3001, () => {
  console.log("🚀 Servidor rodando em http://localhost:3001/api/services");
});
