import express from "express";
import filmes from "./filmesRoutes.js";
import series from "./seriesRoutes.js";
import usuarios from "./usuarioRoutes.js";
import helmet from "helmet";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("API Stream"));

    app.use(express.json(), helmet(), filmes, series, usuarios)
};

export default routes;