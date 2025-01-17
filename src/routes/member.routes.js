import { Router } from "express";
import { Register, uploadFile } from "../controllers/member.controller.js";
import { upload } from "../middlewares/upload.middleware.js";


const memberRouter = Router();

memberRouter.route("/register").post(upload.fields( [
    { name:"photo" ,maxCount:1 }
    ,{ name:"cnicPic" , maxCount:1 } ,
      { name:"relativeOneCnicPic" , maxCount:1} ,
       {name:"relativeTwoCnicPic" , maxCount:1}
    ]) , Register);

memberRouter.route("/file").post( upload.fields([{name :"file" , maxCount:1}]) , uploadFile )

// point to Noted That The name of file fields are Just a Pure English Alphabet 
// not use the underscore or the any number

export default memberRouter;