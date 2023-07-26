module.exports= class ApiError extends Error{
status;
errors;
constructor(status,message,errors=[]){
    super(message);
    this.status=status;
    this.errors=errors;
}
static UnAuthError(){
    
    return new ApiError(401,'Пользователь не авторизован')
}
static BadReq(message,errors=[]){
    return new ApiError(400,message,errors)
}
static EmptyReq(message,errors=[]){
    return new ApiError(404,message,errors)
}
}