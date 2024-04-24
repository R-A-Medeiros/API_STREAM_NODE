import express from "express";
import FilmeController from "../controllers/filmesController.js";

const routes = express.Router();

routes.get("/filmes", FilmeController.listarFilmes);
routes.get("/filmes/busca", FilmeController.listaFilmesPorTitulo);
routes.get("/filmes/:id", FilmeController.listarFilmes);
// routes.post("/filmes", FilmeController.cadastrarFilmes);
// routes.put("/filmes/:id", FilmeController.atualizarFilme);
// routes.delete("/filmes/:id", FilmeController.excluirFilme);

export default routes;