import {Router} from "express"
import { addCart, getCart } from "../controllers/cart.controller"

export const routerCart = Router()

routerCart.get("/", getCart)
routerCart.post("/", addCart)