const sequelize = require("sequelize");
const model = require("../models");
const Op = sequelize.Op;
const financa = model.Financa;

module.exports = {
  async create(req, resp) {
    try {
      const { data, categoria_id, titulo, valor } = request.body;

      const Financa = await financa.create({
        data,
        categoria_id,
        titulo,
        valor,
      });

      return resp.json({ msg: "Financa cadastrada com sucesso!!" });
    } catch (error) {
      return resp.json({
        msg: "Não foi possível cadastrar a Financa. ERROR: " + error,
      });
    }
  },

  async update(req, resp) {
    try {
      const { id } = req.params;

      const { data, categoria_id, titulo, valor } = request.body;

      const Financa = await financa.update(
        {
          data,
          categoria_id,
          titulo,
          valor,
        },
        { where: { id } }
      );

      return resp.json({ msg: "Financa alterada com sucesso!!" });
    } catch (error) {
      return resp.json({
        msg: "Não foi possível atualizar a Financa. ERROR: " + error,
      });
    }
  },

  async findAll(req, resp) {
    try {
      const { page } = req.params;
      const limite = 5;

      const Financa = await financa.findAndCountAll({
        order: [["data", "ASC"]],
        include: {
          all: true,
        },
        limit: limite,
        offset: parseInt(page),
      });

      return resp.json(Financa);
    } catch (error) {
      return resp.json({
        msg: "Não foi possível localizar a Financa. ERROR: " + error,
      });
    }
  },

  async findAllDate(req, resp) {
    try {
      const { page, dataInicial, dataFinal } = req.params;
      const limite = 5;

      const Financa = await financa.findAndCountAll({
        limit: limite,
        offset: parseInt(page),
        where: {
          data: {
            [Op.gte]: dataInicial,
            [Op.lte]: dataFinal,
          },
        },
      });

      return resp.json(Financa);
    } catch (error) {
      return resp.json({
        msg: "Não foi possível localizar a Financa. ERROR: " + error,
      });
    }
  },

  async delete(req, resp) {
    try {
      const { id } = req.params;
      const Financa = await financa.destroy({
        where: {
          id: id,
        },
      });

      return resp.json({ msg: "Financa excluída com sucesso!" });
    } catch (error) {
      return resp.json({
        msg: "Não foi possível excluir a Financa. ERROR: " + error,
      });
    }
  },

  async findById(req, resp) {
    try {
      const { id } = req.params;
      let saldo = 0;
      let soma = 0;

      const Financa = await financa.findAll({
        where: {
          categoria_id: parseInt(id),
        },
        include: {
          all: true,
        },
      });

      if (Financa.length === 0) {
        return resp.json({ saldo });
      } else {
        for (soma of Financa) {
          saldo = saldo + soma.valor;
        }
        return resp.json({ saldo });
      }
    } catch (error) {
      return resp.json({
        msg: "Erro ao listar finanças por categoria. ERROR: " + error,
      });
    }
  },
};
