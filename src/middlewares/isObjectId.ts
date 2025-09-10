import { Request, Response, NextFunction } from "express"
import { Types } from "mongoose"

export const isObjectId = (request: Request, response: Response, next: NextFunction) => {
   const { id } = request.params

   if (!Types.ObjectId.isValid(id)) {
      return response.status(404).json({
         message: `Error. El parametro id: ${id}, no tiene el formato esperado`
      })
   }

   next()
}

export const isObjectIdByQuery = (request: Request, response: Response, next: NextFunction) => {
   const { idUsuario } = request.query

   if (!Types.ObjectId.isValid(String(idUsuario))) {
      return response.status(404).json({
         message: `Error. El parametro idUsuario: ${idUsuario}, no tiene el formato esperado`
      })
   }

   next()
}

export const isObjectIdByBody = (request: Request, response: Response, next: NextFunction) => {
   const {idProduct} = request.body

   if (!Types.ObjectId.isValid(idProduct)) {
      return response.status(404).json({
         message: `Error. El parametro idUsuario: ${idProduct}, no tiene el formato esperado`
      })
   }

   next()
}