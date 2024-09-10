import { asyncHandler } from "../utils/asynchandler.js";
import User from "../models/user.models.js"
import {ApiError} from "../utils/apierror.js"
import {cloudinary } from "../utils/cloudinary.js"
import cookieParser from "cookie-parser";
import { ApiResponse } from "../utils/apiresponce.js";
const registerUser = asyncHandler(async (req, res) => {
   
  const {fullname , email , username , password} = req.body
  console.log("email:" , email)
  console.log("username:" , username)

  if(
    [fullname , email , username , password].some(field=>field?.trim==="")
  ){
    throw new ApiError(400,"all field is required")
  }

  const existedUser = User.findOnre({
    $or:[{email} , { username}]
  })

    if(existedUser){
      throw new ApiError(409,"user already exist")
    }

     const avatarLocalPath =  req.files?.avatar[0]?.path;
     const coverImageLocalPath =  req.files?.coverImage?.path;

     if(!avatarLocalPath){
      throw new ApiError(404 , "Avater not found")
     }

     const avatar = await cloudinary(avatarLocalPath)
     const coverIamge = await cloudinary(coverImageLocalPath)

     if(!avatar){
      throw new ApiError(400 , "Avatar is required")
     }

    const user =  User.create({
      fullname,
      avatar:avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      username:username.toLowerCase()
     })

     const createuser = await user.findById(user._id).select(
      "_-password -refreshToken"
     )

      if(!createuser){
        throw new ApiError(500 , "problem occur in server")
      }

      return res.status(201).json(
        new ApiResponse(200,createuser,"User REgistered")
      )
  });

  export  {registerUser, }
