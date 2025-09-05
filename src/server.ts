import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { routerUsuario } from "./routes/usuario.route"
import { connectDB } from "./config/db.mongo"

const port = process.env.PORT || 4000


const init = async () => {
   await connectDB()
   console.log("Conexión con la base de datos fue exitosa")

   const app = express()
   app.use(express.json())

   app.use("/usuario", routerUsuario)

   app.listen(port, () => {
      console.log(`App running in http://localhost:${port}`)
   })
}

try {
   init()
} catch (error) {
   process.exit(1)
}