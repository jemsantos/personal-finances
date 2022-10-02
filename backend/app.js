const express = require("express");
const cors = require("cors");
const router = require("./router/router");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8080, (req, resp) => {
  console.log("Servidor rodando na porta 8080");
});
