import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//| App Configuration ||||

app.use(express.json({limit:50000}))
app.use(express.urlencoded({limit:50000,extended:true}))
app.use(express.static("public"))
app.use(cookieParser());
app.use(cors({    
    // origin:["http://localhost:5173" , "http://localhost:5174"],
    origin:["https://almasroorhstl.vercel.app","https://almasroorhstlmanagement.vercel.app"],
    credentials:true ,
    methods:["POST", "GET"]
}));

// Dafault Route "/"
app.get("/" , (req,res)=>{    
    res.send(`<h3> Hello Dear Dost Muhammad,\n  You Are the dM-Developer  <hr> ${process.env?.HELLO} <hr> Email : ${process.env.COMPANYeMAIL} <br> PORT : ${process.env?.PORT} ,
            // <br> CLOUDnAME:   ${process.env?.CLOUDnAME} 
        // <br> CLOUDaPIkEY :   ${process.env?.CLOUDaPIkEY} 
        // <br> CLOUDaPIsECRET :   ${process.env?.CLOUDaPIsECRET} 
        // <br> COMPANYeMAIL:   ${process.env?.COMPANYeMAIL} 
        // <br> EMAILpASSWORD :   ${process.env?.EMAILpASSWORD} 
        // <br> TOKENsECRET :   ${process.env?.TOKENsECRET} 
      <hr>   --  changed

 </h3> 
        `)
})


    

// Routes Importing

import memberRouter from "./routes/member.routes.js";
// Routes Declaration
app.use("/member", memberRouter)

export default app;







