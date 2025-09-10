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
      const { ...idUsuario } = request.query
      const { quantity, idProduct, ...data } = request.body

      const item = await CartModel.findOne({ idProduct, ...idUsuario })

      if (!item) {
         const product = new CartModel({
            idProduct,
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

export const removeOneItemFromCart = async (request: Request, response: Response) => {
   try {
      const { ...idUsuario } = request.query
      const { id } = request.params

      const product = await CartModel.findOneAndDelete({ _id: id, ...idUsuario })

      if (!product) {
         return response.status(404).json({
            message: "Error. El Item no existe"
         })
      }

      response.json({
         message: `Exito. Se elimino el item ${product.title} del carrito`
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         Error: error
      })
   }
}

export const modifyQuantity = async (request: Request, response: Response) => {
   try {
      const { idUsuario } = request.query
      const { id } = request.params
      const { quantity } = request.body

      const product = await CartModel.findOne({ _id: id, idUsuario })

      if (!product) {
         return response.status(404).json({
            message: "Error. Compruebe los datos"
         })
      }

      const cantidad = product.quantity + quantity
      const port = process.env.PORT || 4000

      if (cantidad < 1) {
         const resp = await fetch(`http://localhost:${port}/cart/${id}?idUsuario=${idUsuario}`, {
            method: "DELETE"
         })

         if (resp.status !== 200) {
            const message = await resp.json()
            return response.status(resp.status).json({
               message
            })
         }

         return response.json({
            message: `El producto ${product.title} fue removido de su carrito por llegar a una cantidad negativa`
         })
      }

      product.quantity = cantidad
      await product.save()

      response.json({
         message: `Exito. La cantidad del item ${product.title} fue actualizado`
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