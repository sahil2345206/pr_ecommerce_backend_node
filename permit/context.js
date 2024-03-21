"use strict";
const auth = require("./auth");
const response = require("../exchange/response");

const builder = (req, res, next) => {
  const context = {
    logger: require("@open-age/logger")("permit:context:builder"),
  };

  req.context = context;

  if (next) {
    return next();
  }

  return null;
};

const validateToken = async (req, res, next) => {
  builder(req, res);

  const log = req.context.logger.start(`permit:auth:validateToken`);

  const token = req.headers["x-access-token"];

  if (!token) {
    return response.failure(res, "token is required");
  }

  const details = auth.extractToken(token, req.context);

  if (details.name === "TokenExpiredError") {
    return response.unAuthorized(res, "token expired");
  }
  if (details.name === "JsonWebTokenError") {
    return response.failure(res, "token is invalid");
  }

  const user = await db.user.findById(details._id).populate("role");

  if (!user) {
    return response.failure(res, "invalid user");
  }

  req.context.user = user;
  const userData = req.context.user;
  //   try {
  //     const permissions = await checkPermissions(userData, req.method);
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  log.end();
  return next();
};

const requiresToken = async (req, res, next) => {
  builder(req, res);
  const log = req.context.logger.start(`permit:auth:requiresToken`);
  const token = req.headers["x-access-token"];
  if (!token) {
    return response.failure(res, "token is required");
  }
  const decodedUser = auth.extractToken(token, req.context);
  const user = await db.user.findById(decodedUser.id);
  if (!user) {
    return response.failure(res, "invalid user");
  }
  req.context.user = user;
  log.end();
  return next();
};

// const checkPermissions = async (user, method) => {
//   if (
//     user.role &&
//     user.role.type !== undefined &&
//     user.role.type !== "employee"
//   ) {
//     switch (method) {
//       case "GET":
//         user.role.type.all || user.role.type.view ? true : false;
//         break;
//       case "PUT":
//         user.role.type.all || user.role.type.edit ? true : false;
//         break;
//       case "POST":
//         user.role.type.all || user.role.type.add ? true : false;
//         break;
//       case "DELETE":
//         user.role.type.all ? true : false;
//         break;
//       default:
//         break;
//     }
//   } else {
//     throw new Error("Role not found");
//   }
// };

exports.builder = builder;
exports.requiresToken = requiresToken;
exports.validateToken = validateToken;
