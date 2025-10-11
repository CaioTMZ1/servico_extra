import db from "../config/db.js";

// Lista todos os serviços adicionais
export const getAllAdditionalServices = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, titulo, descricao, preco, incluso, icone
      FROM servico_adicional
      ORDER BY id ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar serviços adicionais:", error);
    res.status(500).json({ message: "Erro ao listar serviços adicionais" });
  }
};
