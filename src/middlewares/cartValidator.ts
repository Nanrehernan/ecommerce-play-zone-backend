import { Request, Response, NextFunction } from "express"
import { body, query, validationResult } from "express-validator"

export const cartValidation = [
   query("idUsuario").exists().notEmpty().withMessage("El parametro idUsuario es requerido en la ruta"),
   body("title").exists().notEmpty().withMessage("La propiedad title es requerido y no puede ser vacío"),
   body("description").exists().notEmpty().withMessage("La propiedad description es requerido y no puede ser vacío"),
   body("price").exists().notEmpty().isNumeric().isInt({ min: 1 }).custom(value => typeof value !== "number" ? false : true).withMessage("La propiedad price es requerido, debe ser del tipo Number y mayor a cero"),
   body("category").exists().notEmpty().withMessage("La propiedad category es requerido y no puede ser vacío"),
   body("quantity").exists().isNumeric().withMessage("La cantidad debe ser un numero negativo o positivo"),
   (request: Request, response: Response, next: NextFunction) => {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
         return response.status(404).json({
            message: "Error. La petición no pudo ser completada",
            errors: errors.array()
         })
      }

      next()
   }
]

export const modifyCartValidation = [
   body("quantity").exists().isNumeric().withMessage("La cantidad debe ser un numero negativo o positivo"),
   (request: Request, response: Response, next: NextFunction) => {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
         return response.status(404).json({
            message: "Error. La petición no pudo ser completada",
            errors: errors.array()
         })
      }

      next()
   }
]