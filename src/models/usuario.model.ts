import { Schema, model, Types, Document } from "mongoose";

export interface Usuario extends Document {
   _id: Types.ObjectId,
   nombre: string,
   email: string,
   password: string
}

const usuarioShema = new Schema<Usuario>(
   {
      nombre: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true }

   },
   {
      strict: true
   })

export const UserModel = model<Usuario>("User", usuarioShema)