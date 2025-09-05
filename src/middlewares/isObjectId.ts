import { Request, Response, NextFunction } from "express"
import { Types } from "mongoose"

export const isObjectId = (request: Request, response: Response, next: NextFunction) => {
   const method = request.method
   let _id = ""

   if (method === "GET" || method === "DELETE") {
      _id = request.params._id
   } else if (method === "PUT") {
      _id = request.body._id
   }

   if (method === "GET" && !_id) {
      return response.status(404).json({
         message: `El parametro _id, es requerido en esta petición`
      })
   }

   if (method !== "GET" && !_id){
      return response.status(404).json({
         message: `La propiedad _id, es requerido en el objeto para esta petición`
      })
   }

   if (!Types.ObjectId.isValid(_id)) {
      return response.status(404).json({
         message: `El parametro _id: ${_id}, no tiene el formato esperado`
      })
   }

   next()
}