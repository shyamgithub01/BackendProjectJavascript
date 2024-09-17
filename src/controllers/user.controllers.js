import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponce.js"
import { User } from "../models/user.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";


const generateAccessTokenAndRefreshToken = async (userId) =>{
  try {
  const user =   await User.findById(userId)
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()


  user.refreshToken = refreshToken
  await user.save({validateBeforeSave : false})

  return{ refreshToken , accessToken}


  } catch (error) {
    throw new ApiError(500 , "Something went wrong while generating token ")
  }
}


export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // Validate that all required fields are provided
  if ([fullName, email, username, password].some(field => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Handle file uploads
  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar");
  }

  // Create user
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  });

  // Fetch user data without sensitive fields
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

export const loginUser = asyncHandler(async (req,res)=>{
  // req body -> data
  // username or email 
  // find the user 
  // password check 
  // access and refresh token 
  // send cookie
  const {username , email , password} = req.body

      if(!username || !email){
      throw new ApiError (400 , "username or email is required")

}
     const user = await User.findOne({$or:[{username} , {email}]})

     if(!user){
      throw new ApiError(404,"user does not exist")
     }

     const isPasswordValid = await user.isPasswordCorrect(password)

     if(!isPasswordValid){
      throw new ApiError(404,"password incorrect")
     }

    const {accessToken , refreshToken} = await  generateAccessTokenAndRefreshToken(user._id)


    const LoggedInUser = await User.findById(User._id)
    select("-password -refreshtoken")

    const options = {
      httpOnly : true,
      secure:true
    }
    return res.status(200).cookie("accessToken " , accessToken,options).cookie("refreshToken" , refreshToken , options)

    .json(
      new ApiResponse (
        200,
        {user:LoggedInUser , accessToken , refreshToken}
      )
    )



      





})