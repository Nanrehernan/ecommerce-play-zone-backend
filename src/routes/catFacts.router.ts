import { Router } from "express"
import { catFacts } from "../controllers/catFacts.controller"

export const routerCatFacts = Router()

routerCatFacts.get("/", catFacts)