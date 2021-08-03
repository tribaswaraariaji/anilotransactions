const passport = require("passport");
const jwt = require("jsonwebtoken");
const { schema } = require("../config/database");
const responseFormatter = require("../responses/responses");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports.reqAuth = (req, res, next) => {
  try{
    const {authorization} = req.headers;
    const schema = {
      authorization: 'string',
  };
    const validate = v.validate(req.headers, schema);
    if (validate.length){
      return responseFormatter.error(res, null, validate[0].message, 401);
    }
    const authHeader = req.headers.authorization.split(' ');
    if(!(authHeader[0]==='bearer' || authHeader[0] === 'Bearer')){
      return responseFormatter.error(res,null,'Bearer token must be provided',401);
    }
    const token = authHeader[1];
    jwt.verify(token, 'secretkey', function(err,decoded){
      if(err){
        return responseFormatter.error(res,null,err.message,401);
      }
      req.user = decoded.user;
      return next();
    });
  } catch (error){
    responseFormatter.error(res, null, error.message,500);
  }
};

