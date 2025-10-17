import db from "../config/db.js";

export const getAllServices = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.id,
        s.titulo,
        s.descricao,
        s.detalhes,
        s.preco,
        s.localidade,
        s.contato,
        i.imagem
      FROM servico s
      LEFT JOIN imagen_servico i ON s.id = i.servico_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Erro no getAllServices:", error);
    res.status(500).json({ message: "Erro ao listar serviços" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const [serviceRows] = await db.query(
      `
      SELECT 
        s.id,
        s.titulo,
        s.descricao,
        s.detalhes,
        s.preco,
        s.localidade,
        s.contato,
        i.imagem
      FROM servico s
      LEFT JOIN imagen_servico i ON s.id = i.servico_id
      WHERE s.id = ?
      `,
      [id]
    );

    if (serviceRows.length === 0)
      return res.status(404).json({ message: "Serviço não encontrado" });

    const service = serviceRows[0];

    const [caracteristicas] = await db.query(
      `SELECT descricao FROM caracteristica_servico WHERE servico_id = ?`,
      [id]
    );

    const [inclusos] = await db.query(
      `SELECT descricao FROM servico_incluido WHERE servico_id = ?`,
      [id]
    );

    service.caracteristicas = caracteristicas.map((c) => c.descricao);
    service.inclusos = inclusos.map((i) => i.descricao);

    res.json(service);
  } catch (error) {
    console.error("Erro no getServiceById:", error);
    res.status(500).json({ message: "Erro ao buscar detalhes do serviço" });
  }
};


export const getAdditionalServices = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        titulo,
        descricao,
        preco,
        icone
      FROM servico_adicional
    `);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao listar serviços adicionais:", error);
    res.status(500).json({ message: "Erro ao listar serviços adicionais" });
  }
};



