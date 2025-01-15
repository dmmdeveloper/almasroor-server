import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({

    // APPLICANT DATA
    name :{
        type : String,
        trim : true ,
        required : true,
    },
    father_name :{
        type : String,
        trim : true ,
        required : true,
    },
    religion :{
        type : String,
        enum :["Muslim", "Hindu", "Christian", "Ahmadiyya", "Sikh"],
        default :"Muslim"
    },
    contact: {
        type:Number,
        required:true,
    },
    cnic : {
        type:String,
        required:true,
    },
    photo:{
        type:String , 
        required : true
    },
    cnic_pic:{
        type:String , 
        required : true
    },

// EMPLOYMENT DATA
work_post:{
    type :String , 
    enum :["Student" , "Employee"],
    default :"Employee"
},
work_place :String,
office_contact : Number, 


// RELATIVES DATA
relative1_name:{
    type :String, 
    required : true,
},
relative1_relation :{
    
    type:String,
    required:true,
    enum :["Father" , "Brother"],
    default:"Father"
},
relative1_contact :{
    type:Number,
    required:true,
},
relative1_cnic_pic :{
    type:String,
    required:true,
},

relative2_name : String,
relative2_relation :{
    type:String,
    enum :["Father" , "Brother"],
},
relative2_contact :Number,
relative2_cnic_pic:String,
form_no :Number,

} , {timestamps : true});

// pre hook which add in form_no random form Number => math.floor( math.random()*9)+math.floor( math.random()*99)+math.floor( math.random()*999)
memberSchema.pre("save" , function (next) {
// if(!this.isModified("form_no")) return next();
this.form_no = (Math.floor(Math.random()*9)*Math.floor(Math.random()*99)+Math.floor(Math.random()*999))
next();
});


export const Member = mongoose.model("Member" , memberSchema);
