"use strict";
const service = require("../services/users");
const response = require("../exchange/response");
const userMapper = require("../mappers/user");
const user = require("../models/user");

//register api
// const create = async (req, res) => {
//   const log = req.context.logger.start(`api:users:create`);
//   try {
//     const user = await service.create(req.body, req.files, req.context);
//     const message = "User Register Successfully";
//     log.end();
//     return response.success(res, message, userMapper.toModel(user));
//   } catch (err) {
//     log.error(err);
//     log.end();
//     return response.failure(res, err.message);
//   }
// };


const create = async (req, res) => {
  const log = req.context.logger.start(`api:users:create`);
  try {
    const user = await service.create(req.body,req.files, req.context);
    const message = "User Register Successfully";
    log.end();
    return response.success(res, message, userMapper.toModel(user));
    // return response.data(res, message,user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};


//login api
const login = async (req, res) => {
  const log = req.context.logger.start(`api:users:login`);
  try {
    const user = await service.login(req.body, req.context);
    const message = "Login successfuly";
    log.end();
    return response.authorized(res, user, user.token, message);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

// current user
const currentUser = async (req, res) => {
  const log = req.context.logger.start(`api:users:currentUser`);
  try {
    const user = await service.currentUser(
      req.params.id,
      req.body,
      req.context
    );
    const message = "Current User";
    log.end();
    return response.success(res, message, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// change password
const changePassword = async (req, res) => {
  const log = req.context.logger.start("api:users:changePassword");
  try {
    const message = await service.changePassword(
      req.params.id,
      req.body,
      req.context
    );
    log.end();
    return response.success(res, message);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

//getUsers
const getAll = async (req, res) => {
  console.log(req)
  const log = req.context.logger.start("api:users:getAll");
  try {
    const user = await service.getAll(req.query,req.context);
    const message = "User get Successfully";
    log.end();
    return response.success(res, message, user);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

//getUsersid
const getById = async (req, res) => {
  const log = req.context.logger.start(`api:users:getById`);
  try {
    const user = await service.getById(req.params.id, req.context);
    const message = "User get by id Successfully";
    log.end();
    return response.success(res, message, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

//deleteUser
const deleteUser = async (req, res) => {
  const log = req.context.logger.start(`api:users:deleteUser`);
  try {
    const user = await service.deleteUser(req.params.id, req.context);
    log.end();
    return response.data(res, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};
//update user
const update = async (req, res) => {
  const log = req.context.logger.start(`api:users:update`);
  try {
    const user = await service.update(req.params.id, req.body,req.files, req.context);
    log.end();
    return response.data(res, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const otpVerifyAndChangePassword = async (req, res) => {
  const log = req.context.logger.start("api:users:otpVerify");
  try {
    const data = await service.otpVerifyAndChangePassword(
      req.body,
      req.headers["x-access-token"],
      req.context
    );
    const message = "Password Updated Successfully";
    log.end();
    return response.success(res, message, data);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const forgotPassword = async (req, res) => {
  const log = req.context.logger.start("api:users:forgotPassword");
  try {
    const data = await service.forgotPassword(req.body, req.context);
    const message = "Password successfully sent on register email";
    log.end();
    console.log("data", data);
    return response.success(res, message, data);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};
const userProfilePicture = async (req, res) => {
  const log = req.context.logger.start("api:users:userProfilePicture");
  try {
    const data = await service.userProfilePicture(
      req.params.id,
      req.files,
      req.context
    );
    log.end();
    return response.data(res, data);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};
const search = async (req, res) => {
  const log = req.context.logger.start(`api:users:search:${req.query.fullName}`);
  try {
    const users = await service.search(req.query, req.context);
    log.end();
    // return response.data(res, userMapper.toSearchModel(user));
    return response.data(res,users)
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// const agencyUsres = async (req, res) => {
//   const log = req.context.logger.start("api:users:agencyUsers");
//   try {
//     const data = await service.getByAgency(req.params.agencyId, req.context);
//     log.end();
//     return response.data(res, data);
//   } catch (err) {
//     log.end();
//     return response.failure(res, err.message);
//   }
// };

const sendOtp = async (req, res) => {
  const log = req.context.logger.start("api:users:sendOtp");
  try {
    const data = await service.sendOtp(req.params.id, req.context);
    log.end();
    return response.data(res, data);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

const getEmployees = async (req, res) => {
  const log = req.context.logger.start("api:users:getEmployees");
  try {
    const data = await service.getEmployees(req.body, req.context);
    log.end();
    return response.data(res, data);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};
const verifyOtp = async (req, res) => {
  const log = req.context.logger.start("api:users:verifyOtp");
  try {
    const data = await service.verifyOtp(req.body, req.context);
    log.end();
    return response.data(res, data);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

const signtureUpdate = async (req, res) => {
  const log = req.context.logger.start("api:users:signtureUpdate");
  try {
    const data = await service.signtureUpdate(
      req.params.id,
      req.files,
      req.context
    );
    log.end();
    return response.data(res, data);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

const searchEmployees = async (req, res) => {
  const log = req.context.logger.start("api:users:searchEmployees");
  try {
    const data = await service.searchEmployees(req.query, req.context);
    log.end();
    return response.data(res, data);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};
const asignmentLastTimeSheet = async (req, res) => {
  const log = req.context.logger.start("api:users:asignmentLastTimeSheet");
  try {
    const data = await service.asignmentLastTimeSheet(req.query, req.context);
    log.end();
    return response.data(res, data);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};
// const searchEmployeeByAgency = async (req, res) => {
//   const log = req.context.logger.start("api:users:asignmentLastTimeSheet");
//   try {
//     const data = await service.searchEmployeeByAgency(req.query, req.context);
//     log.end();
//     return response.data(res, data);
//   } catch (err) {
//     log.end();
//     return response.failure(res, err.message);
//   }
// };

// const managerLogin = async (req, res) => {
//   const log = req.context.logger.start("api:users:managerLogin");
//   try {
//     const data = await service.managerLogin(req.body, req.context);
//     log.end();
//     return response.data(res, data);
//   } catch (err) {
//     log.error(err.message);
//     return response.failure(res, err.message);
//   }
// };
// const adminLogin = async (req, res) => {
//   const log = req.context.logger.start("api:users:adminLogin");
//   try {
//     const admin = await service.adminLogin(req.body, req.context);
//     log.end();
//     return response.data(res, admin);
//   } catch (err) {
//     log.error(err.message);
//     return response.failure(res, err.message);
//   }
// };
exports.login = login;
exports.create = create;
exports.getById = getById;
exports.currentUser = currentUser;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.getAll = getAll;
exports.deleteUser = deleteUser;
exports.update = update;
exports.otpVerifyAndChangePassword = otpVerifyAndChangePassword;
exports.userProfilePicture = userProfilePicture;
// exports.agencyUsres = agencyUsres;
exports.sendOtp = sendOtp;
exports.getEmployees = getEmployees;
exports.verifyOtp = verifyOtp;
// exports.signtureUpdate = signtureUpdate;
exports.searchEmployees = searchEmployees;
exports.asignmentLastTimeSheet = asignmentLastTimeSheet;
// exports.searchEmployeeByAgency = searchEmployeeByAgency;
// exports.managerLogin = managerLogin;
// exports.adminLogin = adminLogin;
exports.search = search;
