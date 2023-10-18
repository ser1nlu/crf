import PacienteModel from "../models/PacienteModel.js";


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



export {
    registrar,
    autenticar
}