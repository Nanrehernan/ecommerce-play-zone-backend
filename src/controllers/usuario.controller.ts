import { Request, Response } from "express"
import { UsuarioModel } from "../models/usuario.model"
import { passworHash } from "../helpers/bcryptHash"

export const getUsuario = async (request: Request, response: Response) => {
   try {
      const usuarios = await UsuarioModel.find()

      response.json({
         message: "Exito",
         data: usuarios
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         Error: error
      })
   }
}

export const getUsuarioById = async (request: Request, response: Response) => {
   try {
      const { _id } = request.params

      const usuario = await UsuarioModel.findById(_id)

      if (!usuario) {
         return response.status(404).json({
            message: "Usuario no encontrado"
         })
      }

      response.json({
         message: "Exito. Usuario encontrado",
         data: usuario
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         Error: error
      })
   }
}

export const addUsuario = async (request: Request, response: Response) => {
   try {
      const {password, ...data} = request.body

      const usuario = new UsuarioModel({
         ...data,
         password: await passworHash(password)
      })
      await usuario.save()

      if (!usuario) {
         return response.status(404).json({
            message: "Error al guardar el usuario, compruebe los datos"
         })
      }

      response.json({
         message: `Exito. El usuario ${usuario.nombre} fue agregado a la base de datos`,
         data: usuario
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         Error: error
      })
   }
}

export const deleteUsuario = async (request: Request, response: Response) => {
   try {
      const { _id } = request.params
      const usuario = await UsuarioModel.findByIdAndDelete(_id)

      if (!usuario) {
         return response.status(404).json({
            message: "Error. No se pudo eliminar el usuario. El usuario no existe en la base de datos"
         })
      }

      response.json({
         message: `Exito. Usuario ${usuario.nombre}, fue elimando de la base de datos`
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         error
      })
   }
}

export const updateUsuario = async (request: Request, response: Response) => {
   try {
      const { _id, password, ...data } = request.body

      const updateUsuario = {
         ...data,
         password: await passworHash(password)
      }

      const usuario = await UsuarioModel.findByIdAndUpdate(_id, updateUsuario, { new: true, runValidators: true })

      if (!usuario) {
         return response.status(404).json({
            message: "Error. No se pudo actualizar el usuario. El usuario no existe en la base de datos"
         })
      }

      response.json({
         message: `Exito. Los datos del usuario ${usuario.nombre}, fue actualizado`,
         data: usuario
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         Error: error
      })
   }
}