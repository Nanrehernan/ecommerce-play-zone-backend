import { Types, model, Schema } from "mongoose"
import { type Product, ProductSchema } from "./product.model";

export interface Cart extends Product {
   idUsuario: Types.ObjectId,
   quantity: number
}

const cartSchema = new Schema<Cart>({
   ...ProductSchema,
   idUsuario: {type: Schema.Types.ObjectId, ref: "Usuario", required: true},
   quantity: { type: Number, required: true, min: 1 }
},
   {
      strict: true
   })

export const CartModel = model("Cart", cartSchema)