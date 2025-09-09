import { Request, Response } from "express"
import { UserModel } from "../models/usuario.model"
import { passworHash } from "../helpers/bcryptHash"
import { Error as MongooseError } from "mongoose"

export const getUsuario = async (request: Request, response: Response) => {
   try {
      const usuarios = await UserModel.find()

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
      const { id } = request.params

      const usuario = await UserModel.findById({ _id: id })

      if (!usuario) {
         return response.status(404).json({
            message: "Error. Usuario no encontrado, compruebe los datos"
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
      const { password, ...data } = request.body

      const usuario = new UserModel({
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
      if (error instanceof MongooseError.ValidationError) {
         return response.status(404).json({
            message: error.message,
            error: error.name
         })
      }

      response.status(500).json({
         message: "Error inesperado",
         error
      })
   }
}

export const deleteUsuario = async (request: Request, response: Response) => {
   try {
      const { id } = request.params
      const usuario = await UserModel.findByIdAndDelete({ _id: id })

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
      const { id } = request.params
      const { password, ...data } = request.body

      const updateUsuario = {
         ...data,
         password: await passworHash(password)
      }

      const usuario = await UserModel.findById({_id: id})

      if (!usuario) {
         return response.status(404).json({
            message: "Error. No se pudo actualizar el usuario. El usuario no existe en la base de datos"
         })
      }

      Object.assign(usuario, updateUsuario)
      await usuario.save()

      response.json({
         message: `Exito. Los datos del usuario ${usuario.nombre}, fue actualizado`,
         data: usuario
      })
   } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
         return response.status(404).json({
            message: error.message,
            error: error.name
         })
      }

      response.status(500).json({
         message: "Error inesperado",
         error
      })
   }
}