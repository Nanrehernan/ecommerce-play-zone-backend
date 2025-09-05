import { Schema, model, Types } from "mongoose";

export interface Usuario{
   _id?: Types.ObjectId,
   nombre: string,
   email: string,
   password: string
}

const usuarioShema = new Schema<Usuario>({
   nombre: {type: String, required: true},
   email: {type: String, required: true},
   password: {type: String, required: true}

})

export const UsuarioModel = model<Usuario>("Usuario", usuarioShema)