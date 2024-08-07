function errorHandler(error, req, res, next) {
  // console.log(error);
    let status = error.status || 500;
    let message = error.message || "Internal Server Error";
  
    switch (error.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        status = 400;
        message = error.errors[0].message;
        break;
      case "emailRequired":
        status = 400;
        message = "Email is required";
        break;
      case "passwordRequired":
        status = 400;
        message = "Password is required";
        break;
      case "JsonWebTokenError":
      case "invalidToken":
        status = 401;
        message = "Invalid Token";
        break;
      case "401":
        status = 401;
        message = "Email/Password Invalid";
        break;
      case "notAuthorized":
        status = 403;
        message = "You are forbidden to access this data";
        break;
      case "404":
        status = 404;
        message = "Data not found";
        break;
      default:
        break;
    }
    res.status(status).json({ message });
  }
  
  module.exports = errorHandler;
  