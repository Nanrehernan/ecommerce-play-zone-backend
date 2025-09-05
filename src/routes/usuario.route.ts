import {Router} from "express"
import { getUsuario, getUsuarioById, addUsuario, deleteUsuario, updateUsuario } from "../controllers/usuario.controller"
import { isObjectId } from "../middlewares/isObjectId"
import { userValidation } from "../middlewares/userValidator"

export const routerUsuario = Router()

routerUsuario.get("/", getUsuario)

routerUsuario.get("/:_id", isObjectId, getUsuarioById)

routerUsuario.post("/", userValidation, addUsuario)

routerUsuario.delete("/:_id", isObjectId, deleteUsuario)

routerUsuario.put("/", isObjectId, userValidation, updateUsuario)