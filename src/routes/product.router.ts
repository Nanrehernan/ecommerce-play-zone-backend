import { Router } from "express"
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controllers/product.controller"
import { isObjectId } from "../middlewares/isObjectId"
import { productValidation } from "../middlewares/productValidator"

export const routerProducto = Router()

routerProducto.get("/", getProduct)
routerProducto.get("/:id", isObjectId, getProductById)
routerProducto.post("/", productValidation, addProduct)
routerProducto.delete("/:id", isObjectId, deleteProduct)
routerProducto.put("/:id", isObjectId, productValidation, updateProduct)