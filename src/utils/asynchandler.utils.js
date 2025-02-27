

const asyncHandler = (fnx)=>{
    return (req , res, next)=>{

Promise.
resolve(  fnx(req,res,next) )
.catch( (err)=> next(err) )

    }
}

const asyncHandle =  (fnx)=>{
return  async (req,res,next)=>{
    try {
        await fnx(req,res,next);
    } catch (error) {
        next(error)
    }
}
}

export default asyncHandler;