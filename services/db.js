import mongoose from "mongoose";

const conectionString =
process.env.MONGO_DB || "mongodb://localhost:27017/ecommerce";

export const initMongoDB = async () => {
    try {
        console.log("conectado a la DB");
        console.log(conectionString)
        await mongoose.connect(conectionString)
    } catch (error) {
        console.log(`error ${error}`)
        return error
    }
}

