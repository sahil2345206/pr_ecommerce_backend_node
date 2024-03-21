"use strict";
const service = require("../services/admins");
const response = require("../exchange/response");
const adminMapper = require("../mappers/admin");
const admin = require("../models/admin");

//register api
// const create = async (req, res) => {
//   const log = req.context.logger.start(`api:admins:create`);
//   try {
//     const admin = await service.create(req.body, req.files, req.context);
//     const message = "admin Register Successfully";
//     log.end();
//     return response.success(res, message, adminMapper.toModel(admin));
//   } catch (err) {
//     log.error(err);
//     log.end();
//     return response.failure(res, err.message);
//   }
// };


const create = async (req, res) => {
  const log = req.context.logger.start(`api:admins:create`);
  try {
    const admin = await service.create(req.body,req.files, req.context);
    const message = "admin Register Successfully";
    log.end();
    return response.success(res, message, adminMapper.toModel(admin));
    // return response.data(res, message,admin);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};


//login api
const login = async (req, res) => {
  const log = req.context.logger.start(`api:admins:login`);
  try {
    const admin = await service.login(req.body, req.context);
    const message = "Login successfuly";
    log.end();
    return response.authorized(res, admin, admin.token, message);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

// current admin
const currentadmin = async (req, res) => {
  const log = req.context.logger.start(`api:admins:currentadmin`);
  try {
    const admin = await service.currentadmin(
      req.params.id,
      req.body,
      req.context
    );
    const message = "Current admin";
    log.end();
    return response.success(res, message, admin);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// change password
const changePassword = async (req, res) => {
  const log = req.context.logger.start("api:admins:changePassword");
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

//getadmins
const getAll = async (req, res) => {
  console.log(req)
  const log = req.context.logger.start("api:admins:getAll");
  try {
    const admin = await service.getAll(req.query,req.context);
    const message = "admin get Successfully";
    log.end();
    return response.success(res, message, admin);
  } catch (err) {
    log.end();
    return response.failure(res, err.message);
  }
};

//getadminsid
const getById = async (req, res) => {
  const log = req.context.logger.start(`api:admins:getById`);
  try {
    const admin = await service.getById(req.params.id, req.context);
    const message = "admin get by id Successfully";
    log.end();
    return response.success(res, message, admin);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

//deleteadmin
const deleteadmin = async (req, res) => {
  const log = req.context.logger.start(`api:admins:deleteadmin`);
  try {
    const admin = await service.deleteadmin(req.params.id, req.context);
    log.end();
    return response.data(res, admin);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};
//update admin
const update = async (req, res) => {
  const log = req.context.logger.start(`api:admins:update`);
  try {
    const admin = await service.update(req.params.id, req.body,req.files, req.context);
    log.end();
    return response.data(res, admin);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const otpVerifyAndChangePassword = async (req, res) => {
  const log = req.context.logger.start("api:admins:otpVerify");
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
  const log = req.context.logger.start("api:admins:forgotPassword");
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
const adminProfilePicture = async (req, res) => {
  const log = req.context.logger.start("api:admins:adminProfilePicture");
  try {
    const data = await service.adminProfilePicture(
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
  const log = req.context.logger.start(`api:admins:search:${req.query.fullName}`);
  try {
    const admins = await service.search(req.query, req.context);
    log.end();
    // return response.data(res, adminMapper.toSearchModel(admin));
    return response.data(res,admins)
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// const agencyUsres = async (req, res) => {
//   const log = req.context.logger.start("api:admins:agencyadmins");
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
  const log = req.context.logger.start("api:admins:sendOtp");
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
  const log = req.context.logger.start("api:admins:getEmployees");
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
  const log = req.context.logger.start("api:admins:verifyOtp");
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
  const log = req.context.logger.start("api:admins:signtureUpdate");
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
  const log = req.context.logger.start("api:admins:searchEmployees");
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
  const log = req.context.logger.start("api:admins:asignmentLastTimeSheet");
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
//   const log = req.context.logger.start("api:admins:asignmentLastTimeSheet");
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
//   const log = req.context.logger.start("api:admins:managerLogin");
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
//   const log = req.context.logger.start("api:admins:adminLogin");
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
exports.currentadmin = currentadmin;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.getAll = getAll;
exports.deleteadmin = deleteadmin;
exports.update = update;
exports.otpVerifyAndChangePassword = otpVerifyAndChangePassword;
exports.adminProfilePicture = adminProfilePicture;
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
