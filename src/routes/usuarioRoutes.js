import express from "express";
import UsuarioController from "../controllers/usuarioController.js";


const routes = express.Router();

routes.post("/login", UsuarioController.login);
routes.post("/login/cadastro", UsuarioController.cadastro);



export default routes;