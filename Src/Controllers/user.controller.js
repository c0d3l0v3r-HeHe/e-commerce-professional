import AsyncHandler from "../Utils/AsyncHandler.js";
import ApiError from "../Utils/ApiError.js"
import {User} from "../Models/user.model.js"
import {uplodFileOnCloud} from "../Utils/coludinary.js"
import { ApiResponse } from "../Utils/ApiResponse.js";


const registerUser = AsyncHandler(async (req, res) => {
    // take the input from the frontend
    const {fullName,email,username,password} = req.body;
    // console.log(fullName,email,username,password);
    
    
    // validation  -- not empty
    if(
        [fullName,email,username,password].some((field)=>{
            field?.trim() ===""
        })
    ){
        throw new ApiError(400,"All Fields are necessary !!!");
    }

    // check if already exists : username and email
    const existingUser = User.findOne({
        $or : [{username},{email}]
    })

    if(existingUser != null){
        throw new ApiError(409,"User with Email or Username Already Exists")
    }
    
    
    // check for avatar, check for images
    
    // path of the file uploaded using multer 
    const avatarFilePath = req.files?.avatar[0]?.path
    console.log(avatarFilePath);
    const coverFilePath = req.files?.coverImage[0]?.path
    console.log(coverFilePath);

    if(!avatarFilePath){
        throw new ApiError(400,"Avatar file not stored In temporary Storage");
    }
    if(!coverFilePath){
        throw new ApiError(400,"Avatar file not stored In temporary Storage");
    }


    // upload to the cloudinary , avatar
    const avatar = await uplodFileOnCloud(avatarFilePath);
    const cover = await uplodFileOnCloud(coverFilePath);

    if(!avatar){
         throw new ApiError(400,"Avatar file not created in the Cloudinary");
    }


    // create the User Object
    // push the User to the db
    user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage:cover?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })
    
    // return the information added to the database remvoe password anmd refresh token field
    const createdUser = User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while Making the user in DB");
    }

    // check if everything was okay (user was created)
    // return res
    // retuirn the respoonse 
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Created Successfully")
    )
});

export default registerUser;
