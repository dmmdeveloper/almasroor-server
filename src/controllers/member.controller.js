import { Member } from "../models/members.model.js";
import { APIError } from "../utils/apierror.utils.js";
import { APIResponse, Response } from "../utils/apiresponse.utils.js";
import asyncHandler from "../utils/asynchandler.utils.js";
import { unlinkSync } from "node:fs";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.utils.js";
import { sendEmail } from "../utils/sendMail.utils.js";
import mongoose from "mongoose";

const generateToken = async (id) => {
  try {
    const findMember = await Member.findById(id);
    const token = findMember.generateToken(findMember?._id);

    findMember.token = token;
    await findMember.save();

    return token;
  } catch (error) {
    throw new APIError("Error When Token Generated:)");
  }
};

const Register = asyncHandler(async (req, res) => {
  console.log(req.url);

  // Get Data
  // get files // rm
  // vaidation for file type // rem
  // empty Validation for requiredFields // rem
  // find memeber with name and contact
  // upload images on Cloudinary // rem
  // create object in DB
  // find memeber and remove unnessery fields
  // if user created then sendMail
  // return res

  const {
    name,
    father_name,
    religion,
    contact,
    cnic,
    post,
    work_place,
    office_contact,
    relative1_name,
    relative1_relation,
    relative1_contact,
    relative2_name,
    relative2_relation,
    relative2_contact,
    photo,
    cnicPic,
    relativeOneCnicPic,
    relativeTwoCnicPic,
  } = req.body;

  const findMember = await Member.findOne({
    $and: [{ name }, { contact }],
  });

  if (findMember) {
    res
      .status(401)
      .json(
        new APIResponse(
          ` Dear ${findMember.name} You Are Already Registered ! \n Thanks For Registration Again.`,
          {},
          401
        )
      );

    throw new APIError("Memeber Already Registered !!", 400);
  }

  const providedFields = {
    name,
    father_name,
    religion,
    contact,
    cnic,
    work_post: post,
    work_place,
    office_contact,
    relative1_name,
    relative1_contact,
    relative1_relation,
    photo,
    cnic_pic: cnicPic,
    relative1_cnic_pic: relativeOneCnicPic,
  };

  if (relative2_name) providedFields.relative2_name = relative2_name;
  if (relative2_relation)
    providedFields.relative2_relation = relative2_relation;
  if (relative2_contact) providedFields.relative2_contact = relative2_contact;
  if (relativeTwoCnicPic)
    providedFields.relative2_cnic_pic = relativeTwoCnicPic;

  const createdMember = await Member.create({ ...providedFields });
  const RegisteredMember = await Member.findById(createdMember?._id).select(
    "-updatedAt"
  );

  sendEmail(
    "dostmuhammadmalhoo@gmail.com",
    "Al-Masroor Registeration Form Testing",
    "",
    `<h1>Hello Dear !!!</h1>`
  );
  if (RegisteredMember) {
  } else {
    Response(res, "Error When Member Creation :)", 500);
    throw new APIError("Error When User Creation ", 500);
  }

  // const token = await generateToken(RegisteredMember?._id);

  const options = {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res
    .status(200)
    // .cookie("token" , token  , options)
    .json(
      new APIResponse(
        "Memeber Registered Success Fully !!",
        RegisteredMember,
        201
      )
    );
});

const uploadFile = asyncHandler(async (req, res) => {
  console.log(req.url);

  const file = req.files?.file[0].path || null;
  console.log(file);

  if (!file) {
    Response(res, "File Is Required", 404);
    throw new APIError("File Is Required :)", 404);
  }

  const fileURL = await uploadOnCloudinary(file);

  // Deploy and Test from POstman

  res
    .status(200)
    .json(
      new APIResponse("File Uploaded Success Fully !!", { file, fileURL }, 200)
    );
});

const members = asyncHandler(async (req, res) => {
  console.log(req.url);
  const members = await Member.find().sort({ createdAt: -1 });
  res
    .status(200)
    .json(
      new APIResponse(
        `Members Are Fetched Success Fully !!  ${members.length} `,
        members,
        200
      )
    );
});

const getSingleMemeber = asyncHandler(async (req, res) => {
  // get id from parameters
  // validation for valid id
  // find the memeber
  // send response
  console.log(req.url);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json(new APIResponse("Invalid Memeber Id", {}, 400));
    throw new APIError("Invalid memeber Id");
  }
  const member = await Member.findById(req.params.id);
  if (!member) {
    res.status(400).json(new APIResponse("Member Not Found !", {}, 400));
    throw new APIError("Member Not Found !");
  }

  res
    .status(200)
    .json(
      new APIResponse("Single Memebr Fetched Success Fully !!", member, 200)
    );
});

// Delete Member
const deleteMembr  = asyncHandler ( async (req ,res)=>{
  console.log(req.url);
  console.log(req.params.id);
  if(!mongoose.Types.ObjectId.isValid(req.params?.id)){
    res
    .status(400)
    .json(
      new APIResponse("Invalid Id " , {}, 400)
    )
    throw new APIError("Invalid Id" , 400 ) 
  }
  await Member.findByIdAndDelete(req.params.id)


  res
  .status(200)
  .json(
    new APIResponse("Member Deleted Success Fully", {}, 200)
  )
} )

// Edit etc.... 

export { Register, uploadFile, members, getSingleMemeber , deleteMembr };
