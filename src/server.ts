import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import { routerUsuario } from "./routes/user.router"
import { connectDB } from "./config/db.mongo"
import { routerProducto } from "./routes/product.router"
import { routerCart } from "./routes/cart.router"
import { routerCatFacts } from "./routes/catFacts.router"

const port = process.env.PORT || 4000

const app = express()
app.use(cors({
   origin: "*"
}))
app.use(express.json())

const init = async () => {
   await connectDB()
   console.log("Conexión con la base de datos fue exitosa")

   app.use("/user", routerUsuario)
   app.use("/product", routerProducto)
   app.use("/cart", routerCart)
   app.use("/cat-facts", routerCatFacts)

   app.listen(port, () => {
      console.log(`App running in http://localhost:${port}`)
   })
}

try {
   init()
} catch (error) {
   process.exit(1)
}