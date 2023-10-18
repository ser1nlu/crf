import UsuarioModel from "../models/UsuarioModel.js";
import generarJWT from "../helpers/generarJWT.js";


const registrar = async (req, res) => {
    const { username, password } = req.body;
    const existeUsuario = await UsuarioModel.findOne({ username });

    if (existeUsuario) {
        const error = new Error("El usuario ya existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const usuario = new UsuarioModel(req.body);
        const usuarioGuardado = await usuario.save();
        res.status(200).json(usuarioGuardado);
    } catch (error) {
        console.log(error);
    }
};




const autenticar = async (req, res) => {
    const {username, password} = req.body;
    const usuario = await UsuarioModel.findOne({username});

    console.log(usuario);

    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message})
    }

    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            username: usuario.username,
            password: usuario.password,
            token: generarJWT(usuario.id)
        })
    } else {
        const error = new Error("El password es incorrecto");
        res.status(404).json({msg: error.message});
    }
}

export {
    registrar,
    autenticar
}