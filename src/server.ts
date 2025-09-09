import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { routerUsuario } from "./routes/user.router"
import { connectDB } from "./config/db.mongo"
import { routerProducto } from "./routes/product.router"
import { routerCart } from "./routes/cart.router"

const port = process.env.PORT || 4000


const init = async () => {
   await connectDB()
   console.log("Conexión con la base de datos fue exitosa")

   const app = express()
   app.use(express.json())

   app.use("/user", routerUsuario)
   app.use("/product", routerProducto)
   app.use("/cart", routerCart)

   app.listen(port, () => {
      console.log(`App running in http://localhost:${port}`)
   })
}

try {
   init()
} catch (error) {
   process.exit(1)
}