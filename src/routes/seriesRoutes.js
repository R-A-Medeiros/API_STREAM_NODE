import express from "express";
import SerieController  from "../controllers/seriesController.js";

const routes = express.Router();

routes.get("/series", SerieController.listarSeries);
routes.get("/series/busca", SerieController.listaSeriePorTitulo);
//routes.get("/series/:id", SerieController.listarFilmes);
export default routes;
