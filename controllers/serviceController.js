import db from "../config/db.js";

// GET - Listar todos os serviços
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
    res.status(500).json({ error: error.message });
  }
};

// GET - Buscar serviço por ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const [service] = await db.query(`
      SELECT s.*, i.imagem
      FROM servico s
      LEFT JOIN imagen_servico i ON s.id = i.servico_id
      WHERE s.id = ?
    `, [id]);

    if (service.length === 0) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    const [caracteristicas] = await db.query(
      `SELECT descricao FROM caracteristica_servico WHERE servico_id = ?`,
      [id]
    );

    const [incluidos] = await db.query(
      `SELECT descricao FROM servico_incluido WHERE servico_id = ?`,
      [id]
    );

    res.json({
      ...service[0],
      caracteristicas: caracteristicas.map(c => c.descricao),
      inclusos: incluidos.map(i => i.descricao)
    });
  } catch (error) {
    console.error("Erro no getServiceById:", error);
    res.status(500).json({ error: error.message });
  }
};

// POST - Criar novo serviço
export const createService = async (req, res) => {
  try {
    const { titulo, descricao, detalhes, preco, localidade, contato } = req.body;

    const [result] = await db.query(`
      INSERT INTO servico (titulo, descricao, detalhes, preco, localidade, contato)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [titulo, descricao, detalhes, preco, localidade, contato]);

    res.status(201).json({ id: result.insertId, message: "Serviço criado com sucesso" });
  } catch (error) {
    console.error("Erro no createService:", error);
    res.status(500).json({ error: error.message });
  }
};

// PUT - Atualizar serviço
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, detalhes, preco, localidade, contato } = req.body;

    await db.query(`
      UPDATE servico 
      SET titulo=?, descricao=?, detalhes=?, preco=?, localidade=?, contato=? 
      WHERE id=?
    `, [titulo, descricao, detalhes, preco, localidade, contato, id]);

    res.json({ message: "Serviço atualizado com sucesso" });
  } catch (error) {
    console.error("Erro no updateService:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Remover serviço
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM servico WHERE id=?`, [id]);
    res.json({ message: "Serviço removido com sucesso" });
  } catch (error) {
    console.error("Erro no deleteService:", error);
    res.status(500).json({ error: error.message });
  }
};
