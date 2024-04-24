import express from "express";
import SerieController  from "../controllers/seriesController.js";

const routes = express.Router();

routes.get("/series", SerieController.listarSeries);

export default routes;