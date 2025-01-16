import { Member } from "../models/members.model.js";
import { APIError } from "../utils/apierror.utils.js";
import { APIResponse, Response } from "../utils/apiresponse.utils.js";
import asyncHandler from "../utils/asynchandler.utils.js";
import {unlinkSync} from "node:fs"
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.utils.js";
import { sendEmail } from "../utils/sendMail.utils.js";



const Register =asyncHandler( async ( req , res  )=>{
    console.log(req.url);
    
    // Get Data
    // get files
    // vaidation for file type
    // empty Validation for requiredFields
    // zod Validation For requiredFields
    // find memeber with name and contact 
    // upload images on Cloudinary
    // create object in DB
    // find memeber and remove unnessery fields 
    // if user created then sendMail
    // return res

// Text Data
const { photo , cnicPic ,relativeOneCnicPic ,relativeTwoCnicPic } = req.files;

const requiredFiles =  [ "photo" , "cnicPic" ,"relativeOneCnicPic"]

for(let file of requiredFiles){
    if( !req.files[file]){
        Response(res  , `${file} is Required :)` , 404)
        throw new APIError(`${file} is Required :)`, 404)

    }
}

const { name , father_name , religion , contact , cnic , post , work_place , office_contact , relative1_name , relative1_relation , relative1_contact ,relative2_name , relative2_relation,relative2_contact} = req.body;
// console.log(name , father_name , religion,contact1 , contact2, cnic , post,office_contact ,relative1_name ,  relative1_relation ,relative1_contact , relative2_name ,  relative2_relation , relative2_contact );

const requiredFields = [ "name" , "father_name" , "religion" , "contact"  , "cnic" , "post" , "work_place" , "office_contact" , "relative1_name" , "relative1_relation" , "relative1_contact",]

for( let field of requiredFields){

    if(!req.body[field]){
        Response(res , `${field} is Required :)`, 404)
        unlinkSync(photo[0]?.path)
        // unlinkSync(cnicPic[0]?.path)
        unlinkSync(relativeOneCnicPic[0]?.path)
        if(relativeTwoCnicPic){
            unlinkSync(relativeTwoCnicPic[0]?.path)
        }
        throw new APIError(`${field} is Required :)`, )
    }
};

const findMember = await Member.findOne({
    $and :[ {name } ,{ contact}]
});

if(findMember){
    Response(res ,` Dear ${findMember.name} You Are Already Registered ! \n Thanks For Registration Again.` , 200);
    unlinkSync(photo[0]?.path)
    unlinkSync(cnicPic[0]?.path)
    unlinkSync(relativeOneCnicPic[0]?.path)
    if(relativeTwoCnicPic){
        unlinkSync(relativeTwoCnicPic[0]?.path)
    }
    throw new APIError("Memeber Already Registered !!", 400 )
}


const photoURL = await uploadOnCloudinary(photo[0]?.path);
const cnicPicURL  = await uploadOnCloudinary(cnicPic[0]?.path); 
const relativeOneCnicPicURL  = await uploadOnCloudinary(relativeOneCnicPic[0]?.path);
let  relativeTwoCnicPicURL ;
if(relativeTwoCnicPic){
    relativeTwoCnicPicURL = await uploadOnCloudinary(relativeTwoCnicPic[0]?.path)
}

const providedFields ={

    name , father_name , religion ,contact , cnic , post ,work_place, office_contact , relative1_name , relative1_contact , relative1_relation ,
    photo:photoURL ,
    cnic_pic:cnicPicURL ,relative1_cnic_pic : relativeOneCnicPicURL 
}

if( relative2_name)  providedFields.relative2_name = relative2_name;
if( relative2_relation)  providedFields.relative2_relation  = relative2_relation;
if( relative2_contact) providedFields.relative2_contact  = relative2_contact;
if(relativeTwoCnicPic) providedFields.relative2_cnic_pic = relativeTwoCnicPicURL;


const createdMember = await Member.create({...providedFields} );
const RegisteredMember = await Member.findById(createdMember?._id).select("-updatedAt");


sendEmail("dostmuhammadmalhoo@gmail.com" , "Al-Masroor Registeration Form Testing" , "" , `<h1>Hello Dear !!!</h1>`)
if(RegisteredMember){
}else{
    Response(res,"Error When Member Creation :)" , 500 )
    throw new APIError("Error When User Creation ", 500)
}



res.status(200)
    .json(
        new APIResponse("Memeber Registered Success Fully !!",RegisteredMember, 201)
    );





});


export { Register }