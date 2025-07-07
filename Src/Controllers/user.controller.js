import AsyncHandler from "../Utils/AsyncHandler.js"

const registerUser = AsyncHandler(async (req , res) => {
    res.status(200).json({
        message : "Okay , User Registered "
    })
})

export default registerUser;