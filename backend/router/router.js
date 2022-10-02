//parei no min: 20:50m ( https://www.youtube.com/watch?v=6AEb5-6jqEc )

const express = require("express");
const router = express.Router();
const categoria = require("../controller/categoria");
const financa = require("../controller/financa");

/* Categoria */
router.post("/criar/categoria", categoria.create);
router.get("/listar/categoria/:page", categoria.findAll);
router.put("/atualizar/categoria/:id", categoria.update);

/* Finança */
router.post("/criar/financa", financa.create);
router.get("/listar/financa/:page", financa.findAll);
router.get("/pesquisar/financa/categoria_id/:id", financa.findById);
router.get(
  "/listar/financa/dataInicial/:dataInicial/dataFinal/:dataFinal/page/:page",
  financa.findAllDate
);
router.put("/atualizar/financa/:id", financa.update);
router.delete("/deletar/financa/:id", financa.delete);

module.exports = router;
