import express from "express";
import cors from "cors";
import {config} from "dotenv";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());

config();
connectDB();

app.use("/api/usuarios", usuarioRoutes);



/**Para eliminar el cache y que no se pueda volver con el boton de back del navegador, luego de que hacemos un logout */
app.use(function(req, res, next){
    if(!req.user){
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
    next();
});




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server ejecutandose en http://localhost:${PORT}`);
})