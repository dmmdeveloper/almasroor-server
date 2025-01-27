import dotenv from "dotenv"
import { DBConnection } from "./db/connection.db.js"
import app from "./app.js"

dotenv.config({path:".env"})


let port = process.env?.PORT || 4001

DBConnection()
.then( ()=>{
    app.listen(port,()=>{
        console.log(`=> App is Running On http://localhost:${port}`);
    })
} )
.catch( (error) =>{
    console.log("Error On Index.js" , error);
    
})