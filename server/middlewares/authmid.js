const ApiError = require('../exception/apierror');
const tokenService =require('../service/tokenservice');
module.exports =function(req,res,next){
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return next(ApiError.UnAuthError());
        }
        const accessToken = authHeader.split(' ')[1];
          if (!accessToken) {
            return next(ApiError.UnAuthError());
          }
          const userData = tokenService.valdateAccessToken(accessToken);
            if (!userData) {
              return next(ApiError.UnAuthError());
            }
            req.user=userData;
          
            next();
    } catch (error) {
        return next(ApiError.UnAuthError());
    }
}