import mongoose from "mongoose"

const url = process.env.MONGO_URL

export const connectDB = async () => {
   if (!url) {
      throw new Error("Ruta de conexión a la base de datos no establecida")
   }
   
   await mongoose.connect(url, {
      maxPoolSize: 2,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000
   })
}