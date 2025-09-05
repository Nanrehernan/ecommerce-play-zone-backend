import {Request, Response, NextFunction} from  "express"
import {body, validationResult} from "express-validator"

export const userValidation = [
   body("nombre").exists().notEmpty().withMessage("La propiedad nombre es requerido y no puede ser vacío"),
   body("email").exists().notEmpty().isEmail().withMessage("La propiedad email es requerido, no puede estar vacío y debe tener el formato correcto"),
   body("password").exists().notEmpty().isLength({min: 8}).withMessage("La propiedad password es requerido y debe contener como mínimo 8 carácteres"),
   (request: Request, response: Response, next: NextFunction) => {
      const errors = validationResult(request)

      if (!errors.isEmpty()){
         return response.status(404).json({
            message: "Error. La petición no pudo ser completada",
            errors: errors.array()
         })
      }

      next()
   }
]