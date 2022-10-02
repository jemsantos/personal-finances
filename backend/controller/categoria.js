const sequelize = require("sequelize");
const model = require("../models");
const categoria = model.Categoria;

module.exports = {
  async create(req, resp) {
    try {
      const { descricao } = request.body;

      const Categoria = await categoria.create({
        descricao,
      });

      return resp.json({ msg: "Categoria cadastrada com sucesso!!" });
    } catch (error) {
      return resp.json({
        msg: "Não foi possível cadastrar a Categoria. ERROR: " + error,
      });
    }
  },

  async update(req, resp) {
    try {
      const { id } = req.params;

      const { descricao } = request.body;

      const Categoria = await categoria.update(
        {
          descricao,
        },
        { where: { id } }
      );

      return resp.json({ msg: "Categoria alterada com sucesso!!" });
    } catch (error) {
      return resp.json({
        msg: "Não foi possível atualizar a Categoria. ERROR: " + error,
      });
    }
  },

  async findAll(req, resp) {
    try {
      const { page } = req.params;
      const limite = 5;

      const Categoria = await categoria.findAndCountAll({
        order: [["id", "ASC"]],
        limit: limite,
        offset: parseInt(page),
      });

      return resp.json(Categoria);
    } catch (error) {
      return resp.json({
        msg: "Não foi possível localizar a Categoria. ERROR: " + error,
      });
    }
  },
};
