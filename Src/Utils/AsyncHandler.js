const asyncHandler = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch((error) => {
            console.error(`Error in asyncHandler: ${error.message}`);
            res.status(error.code || 500).json({
                success: false,
                error: "Internal Server Error",
            });
        });
    };
};

export default asyncHandler;

// export const asyncHandler = (func) => async (req,res ,next) =>{
//     try {
//         await func(req, res, next);
//     } catch (error) {
//         console.error(`Error in asyncHandler: ${error.message}`);
//         res.status(error.code || 500).json({ success  : Failed ,error: 'Internal Server Error' });
//     }
// }
