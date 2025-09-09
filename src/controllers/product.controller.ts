import { Request, Response } from "express"
import { Product, ProductModel } from "../models/product.model"
import { Error as MongooseError } from "mongoose"

export const getProduct = async (request: Request, response: Response) => {
   try {
      const {...category} = request.query
      
      let productos: Product[] = []

      if (category){
         productos = await ProductModel.find({...category})
      }else{
         productos = await ProductModel.find()
      }


      response.json({
         message: "Exito",
         data: productos
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         Error: error
      })
   }
}

export const getProductById = async (request: Request, response: Response) => {
   try {
      const { id } = request.params

      const producto = await ProductModel.findById({ _id: id })

      if (!producto) {
         return response.status(404).json({
            message: "Error. Producto no encontrado"
         })
      }

      response.json({
         message: "Exito. Producto encontrado",
         data: producto
      })
   } catch (error) {
      response.status(500).json({
         message: "Error inesperado",
         Error: error
      })
   }
}

export const addProduct = async (request: Request, response: Response) => {
   try {
      const { ...data } = request.body

      const producto = new ProductModel({ ...data })
      await producto.save()

      if (!producto) {
         return response.status(404).json({
            message: "Error al guardar el producto, compruebe los datos"
         })
      }

      response.json({
         messge: `El producto ${producto.title} fue guardado en la base de datos`,
         data: producto
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

export const deleteProduct = async (request: Request, response: Response) => {
   try {
      const { id } = request.params

      const producto = await ProductModel.findByIdAndDelete({ _id: id })

      if (!producto) {
         return response.status(404).json({
            message: "Error. El producto no existe en la base de datos"
         })
      }

      response.json({
         message: `Exito. El prodcuto ${producto?.title} fue eliminado de la base de datos`
      })
   } catch (error) {
      response.status(500).json({
         message: "Error",
         error
      })
   }
}

export const updateProduct = async (request: Request, response: Response) => {
   try {
      const { id } = request.params
      const { ...data } = request.body

      const producto = await ProductModel.findById({_id: id})

      if (!producto){
         return response.status(404).json({
            message: "Error. El producto no existe. Comprube los datos"
         })
      }

      Object.assign(producto, data)
      await producto.save()

      response.json({
         message: `Exito. El producto ${producto.title} fue actualizado`,
         data: producto
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