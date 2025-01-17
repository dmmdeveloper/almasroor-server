import multer from "multer";
import os from "node:os"

// 

// Configuration
const storage  = multer.diskStorage({

    destination : function (req , file , cb) {
        const tmpDir  =os.tmpdir(); 
        cb(null , tmpDir)
    },
    filename : function (req , file , cb) {
        cb(null  , `${Math.floor(Math.random()*9999)}_${file.originalname}`)        
    }
});

export const upload = multer({storage , limits: { fileSize: 30 * 1024 * 1024 } });