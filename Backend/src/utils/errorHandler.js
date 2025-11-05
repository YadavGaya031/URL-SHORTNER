export const errorHandler = (err, req, res, next) => {
    if(err){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }

    console.log(err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};