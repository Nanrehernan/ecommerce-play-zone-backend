import {Router} from "express"
import { addCart, getCart, modifyQuantity, removeOneItemFromCart } from "../controllers/cart.controller"
import { isObjectId, isObjectIdByBody, isObjectIdByQuery } from "../middlewares/isObjectId"
import { cartValidation, modifyCartValidation } from "../middlewares/cartValidator"

export const routerCart = Router()

routerCart.get("/", isObjectIdByQuery, getCart)
routerCart.post("/", isObjectIdByQuery, isObjectIdByBody, cartValidation, addCart)
routerCart.delete("/:id", isObjectIdByQuery, isObjectId, removeOneItemFromCart)
routerCart.patch("/:id", isObjectIdByQuery, isObjectId, modifyCartValidation, modifyQuantity)