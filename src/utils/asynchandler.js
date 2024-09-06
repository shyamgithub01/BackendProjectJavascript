const asyncHandler = (reqestHandler) =>{
    (req , res , next)=>{
        Promise.resolve(reqestHandler(req,res,next)).
        catch((err)=> next(err))
    }

}



export {asyncHandler}



// const asyncHandler = (fn) => async(req , res , next) => {
//         try{
//             await fn(req , res , next)
//         }
//         catch(error){
//             res.status(err.code || 400).json({
//                 success:false,
//                 message:err.message
//             })
//         }
// }
