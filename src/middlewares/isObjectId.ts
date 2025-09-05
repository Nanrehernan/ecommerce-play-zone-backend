import { Request, Response, NextFunction } from "express"
import { Types } from "mongoose"

export const isObjectId = (request: Request, response: Response, next: NextFunction) => {
   let id = request.params.id

   if (!Types.ObjectId.isValid(id)) {
      return response.status(404).json({
         message: `El parametro id: ${id}, no tiene el formato esperado`
      })
   }

   next()
}