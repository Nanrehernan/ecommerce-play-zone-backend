import { Request, Response } from "express"
import { Error as MongooseError } from "mongoose"
import { CartModel } from "../models/cart.model"

export const getCart = async (request: Request, response: Response) => {
   try {
      const { idUsuario } = request.query

      const carts = await CartModel.find({ idUsuario })

      response.json({
         message: "Exito",
         data: carts
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         Error: error
      })
   }
}

export const addCart = async (request: Request, response: Response) => {
   try {
      const {...idUsuario} = request.query
      const {quantity, _id, ...data} = request.body

      const item = await CartModel.findOne({_id, ...idUsuario})

      if (!item){
         const product = new CartModel({
            _id,
            ...idUsuario,
            ...data,
            quantity
         })

         await product.save()

         return response.json({
            message: `Exito. Se agrego el producto ${product.title} al carrito`,
            data: product
         })
      }

      item.quantity = item.quantity + quantity
      await item.save()

      response.json({
         message: `Exito. Se modifico la cantidad del producto ${item.title}`,
         data: item
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