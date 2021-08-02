const responseFormatter = require("../responses/responses");

module.exports.isAdmin = (req,res,next) => {
    try {
        const user = req.admin;
        // console.log(user);
        if(user.role === 'admin'){
           return next(); 
        }else{
            return responseFormatter.error(res,null,"Anda Bukan Admin!",401);
        }
    } catch (error) {
        responseFormatter.error(res, null, error.message,500);
    }
};