import { Router } from "express";
import {
    autenticar,

} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", autenticar);

router
    .route("/")
    .post(checkAuth, agregarUsuario);

export default router;
