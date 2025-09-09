import { Types, model, Schema, Document } from "mongoose"

export interface Product extends Document {
   _id: Types.ObjectId,
   title: string,
   description: string,
   image: string,
   price: number,
   category: string
}

export const ProductSchema = {
   title: { type: String, required: true },
   description: { type: String, required: true },
   image: { type: String, required: true },
   price: { type: Number, required: true },
   category: { type: String, required: true }
}

const productSchema = new Schema<Product>({
   ...ProductSchema,
},
   {
      strict: true
   })

export const ProductModel = model<Product>("product", productSchema)