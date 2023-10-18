import { Router } from "express";
import { registrar, autenticar } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registrar);
router.post("/login", autenticar);

// router
//     .route("/")
//     .post(checkAuth, agregarUsuario);

export default router;