import "dotenv/config"
import Server from "./services/server.js"
import { initMongoDB } from "./services/database.js";

const init = async () =>{
    await initMongoDB()
    const puerto = process.env.PORT || 4000; 

    Server.listen(puerto, () =>  `Server on port  ${puerto}`)

    Server.on("error", (error)=>{
        console.log("catch error en el servidor", error)
    })
}
init();
