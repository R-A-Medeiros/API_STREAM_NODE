import express from "express";
import filmes from "./filmesRoutes.js";
import series from "./seriesRoutes.js";
import usuarios from "./usuarioRoutes.js";
import helmet from "helmet";
import cors from "cors";

const routes = (app) => {
    app.use(express.json(), helmet(), cors({origin: 'https://danilocineflix.netlify.app'}), filmes, series, usuarios);
    app.use(helmet.contentSecurityPolicy({
        directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'", "https://danilocineflix.netlify.app"],
        imgSrc: ["'self'", "https://danilocineflix.netlify.app"],
        styleSrc: ["'self'"], 
        fontSrc: ["'self'", "https://fonts.googleapis.com"], 
        },
    }));


    app.route("/").get((req, res) => res.status(200).send("API Stream"));

    
};

export default routes;