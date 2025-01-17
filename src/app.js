import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//| App Configuration ||||

app.use(express.json({limit:"200kb"}))
app.use(express.urlencoded({limit:"200kb" , extended : true}))
app.use(express.static("public"))
app.use(cookieParser());
app.use(cors({
    // origin:"http://localhost:5173",
    origin:"https://almasroorhstl.vercel.app",
    credentials:true ,
    methods:["POST", "GET"]
}))


// Dafault Route "/"
app.get("/" , (req ,res)=>{    
    res.send(`<h1> Hello Dear Dost Muhammad , \n  You Are the dM-Developer  <hr> ${process.env?.HELLO} </h1>`)
})


// Routes Importing

import memberRouter from "./routes/member.routes.js";

// Routes Declaration

app.use("/member", memberRouter)



export default app;







