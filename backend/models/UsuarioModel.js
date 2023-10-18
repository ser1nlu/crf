import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new Schema (
    {
        username: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
    }
)

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = model("Usuario", usuarioSchema);
export default Usuario;