const crypto = require("../permit/crypto");
const auth = require("../permit/auth");
const nodemailer = require("nodemailer");
const imgUrl = require("config").get("image").url;
const config = require("config").get("auth");
const fs = require("fs");
const path = require("path");
const { model } = require("mongoose");
const { query } = require("../models/admin");
const ObjectId = require('mongodb').ObjectID

// const build = async (model, files, context, isManager) => {
//   const log = context.logger.start("services:admins:build");

//   let adminSignature;
//   if (files[0] !== undefined) {
//     adminSignature = `${imgUrl}` + files[0].filename;
//   } else {
//     adminSignature = "";
//   }
//   adminSignature.toString();
//   let admin = new db.admin({
//     fullName: model.fullName,
//     email: model.email,
//     phoneNumber: model.phoneNumber,
//     position: model.position,
//     role: model.role,
//     agency: model.agencyId,
//     salary: model.salary,
//     DOB: model.DOB,
//     signature: adminSignature,
//     address: model.address,
//     password: model.password,
//   });
//   if (isManager === "manager") {
//     const agency = await db.agencie.findOne({ _id: model.agencyId });
//     console.log(agency);
//     agency.manager = admin.id;
//     console.log(admin.id);
//     await agency.save();
//   }
//   await admin.save();
//   log.end();
//   return admin;
// };

// const create = async (model, files, context) => {
//   const log = context.logger.start("services:admins:create");

//   const isExist = await db.admin.findOne({
//     $or: [{ email: model.email }, { phoneNumber: model.phoneNumber }],
//   });
//   if (isExist) {
//     throw new Error("admin already exists");
//   }
//   let isManager = "";
//   if (model.role == "manager") {
//     isManager = model.role;
//   }
//   const roles = await db.role.find({});
//   for (let role in roles) {
//     if (roles[role].type == model.role) {
//       model.role = roles[role]._id;
//     }
//   }
//   const password = crypto.getHash(model.password, context);
//   model.password = password;
//   const admin = await build(model, files, context, isManager);

//   log.end();
//   return admin;
// };

const build = async (model,file, context) => {
  const {
    // fullName,
    name,
    email,
    phoneNumber,
    lastQualification,
    role,
    image,
    college,
    course,
    // position,
    // salary,
    // DOB,
    // address,
    // status,
    password,
    // trainingPeriod,
    // sessionStarted,
    // courseFee,
    // submittedFee,
    // pending,
    // placementStatus,
  } = model;
  let fileName = "";

  if (file) {
    console.log("dff");
    fileName = file[0].filename;
  }
  const log = context.logger.start(`services:admins:build${model,file}`);
  const admin = await db
    .admin({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      lastQualification: lastQualification,
      role: role,
      image:fileName,
      college: college,
      course: course,
      password: password,
      // fullName: fullName,
      // salary: salary,
      // DOB: DOB,
      // position: position,
      // address: address,
      // status: status,
      // trainingPeriod: trainingPeriod,
      // sessionStarted: sessionStarted,
      // courseFee: courseFee,
      // submittedFee: submittedFee,
      // pending: pending,
      // placementStatus: placementStatus,
    })
    .save();
  log.end();
  return admin;
};

const create = async (model,file, context) => {
  const log = context.logger.start("services:admins:create");
  const isEmail = await db.admin.findOne({ email: { $eq: model.email } });
  if (isEmail) {
    throw new Error("Email already exists");
  }
  let isManager = "";
  if (model.role == "manager") {
    isManager = model.role;
  }
  const roles = await db.role.find({});
  for (let role in roles) {
    if (roles[role].type == model.role) {
      model.role = roles[role]._id;
    }
  }
  if(model.password!==""&&model.password!==undefined){
    const password = crypto.getHash(model.password, context, isManager);
    model.password = password;
  }
 
  const admin = await build(model,file, context);
  console.log("admin",admin)
  log.end();
  return admin;
};

const login = async (model, context) => {
  const log = context.logger.start("services:admins:login");
  let admin = await db.admin
    .findOne({ email: model.email })
    .populate(["role", "agency", "clients"]);

  if (!admin) throw new Error("admin not found");
  // if (admin.role.type !== "admin") {
  //   if (model.agencyName !== admin.agency.name) {
  //     throw new Error("Agency not found");
  //   }
  //   if (admin.agency.deactivated == true) {
  //     throw new Error("Your Agency has beed deactivated");
  //   }
  // }

  if (!admin) {
    throw new Error("admin email not found");
  }
  const isMatched = crypto.compareHash(model.password, admin.password, context);
  if (!isMatched) {
    throw new Error("Password mismatch found");
  }
  // admin = await admin.populate("agency.manager").execPopulate();
  const token = auth.getToken(admin.id, true, context);
  admin.token = token;
  admin.save();
  log.end();
  return admin;
};

const setadmin = async (model, admin,files, context) => {
  const log = context.logger.start(`services:admins:setadmin`);

  if (model.name !== "" && model.name !== undefined) {
    admin.name = model.name;
  }
  // if (model.email !== "" && model.email !== undefined) {
  //   admin.email = model.email;
  // }
  if (model.phoneNumber !== "" && model.phoneNumber !== undefined) {
    admin.phoneNumber = model.phoneNumber;
  }
  if (model.college !== "" && model.college !== undefined) {
    admin.college = model.college;
  }
  if (model.course !== "" && model.course !== undefined) {
    admin.course = model.course;
  }
  if (
    model.lastQualification !== "" &&
    model.lastQualification !== undefined
  ) {
    admin.lastQualification = model.lastQualification;
  }
 
  // if (model.fullName !== "" && model.fullName !== undefined) {
  //   admin.fullName = model.fullName;
  // }
  // if (model.position !== "" && model.position !== undefined) {
  //   admin.position = model.position;
  // }

  // if (model.DOB !== "" && model.DOB !== undefined) {
  //   admin.DOB = model.DOB;
  // }
  // if (model.address !== "" && model.address !== undefined) {
  //   admin.address = model.address;
  // }
  // if (model.status !== "" && model.status !== undefined) {
  //   admin.status = model.status;
  // }Cannot convert object to primitive value"
  // if (model.salary !== "" && model.salary !== undefined) {
  //   admin.salary = model.salary;
  // }
  //  if (model.trainingPeriod !== "" && model.trainingPeriod !== undefined) {
  //   admin.trainingPeriod = model.trainingPeriod;
  // }
  // if (model.sessionStarted !== "" && model.sessionStarted !== undefined) {
  //   admin.sessionStarted = model.sessionStarted;
  // }
  // if (model.courseFee !== "" && model.courseFee !== undefined) {
  //   admin.courseFee = model.courseFee;
  // }
  // if (model.submittedFee !== "" && model.submittedFee !== undefined) {
  //   admin.submittedFee = model.submittedFee;
  // }
  // if (model.pending !== "" && model.pending !== undefined) {
  //   admin.pending = model.pending;
  // }
  // if (model.placementStatus !== "" && model.placementStatus !== undefined) {
  //   admin.placementStatus = model.placementStatus;admin
  // }
  // if (model.clients !== "" && model.clients !== undefined) {
  //   admin.clients = model.clients;
  // }
  if (model.password !== ""&&model.password !== "" && model.password !== undefined) {
    let newPassword = crypto.getHash(model.password, context);
    console.log(model.password);
    console.log(newPassword);
    admin.password = newPassword;
  }
  if (files.length > 0) {
    if (admin.image != "" && admin.image !== undefined) {
      let picUrl = admin.image;
      try {
        const paths = path.resolve(__dirname, "../") + "/assets/images";
        await fs.unlinkSync(`${paths}/${picUrl}`);
        admin.image = files[0].filename;
      } catch (err) {
        console.log(err);
      }
    } else {
      admin.image = files[0].filename;
    }
  }
  admin.updatedOn = new Date();
  await admin.save();
  log.end();
  return admin;
};
const update = async (id, model,files, context) => {
  const log = context.logger.start(`services:admins:update`);

  const admin = await db.admin.findById({ _id: id });
  if (!admin) {
    throw new Error(`admin not found`);
  }
  const adminUpdated = await setadmin(model, admin,files, context);
  log.end();
  return adminUpdated;
};

const deleteadmin = async (id, context) => {
  const log = context.logger.start(`services:admins:deleteadmin`);

  if (!id) {
    throw new Error("id is requried");
  }

  let admin = await db.admin.findByIdAndDelete({ _id: id });
  const deleteTimeSheet = await db.timeSheet.deleteMany({ adminId: id });
  const deleteExpense = await db.expense.deleteMany({ adminId: id });

  if (!admin) {
    throw new Error("admin not found");
  }
  log.end();
  return admin;
};

const getById = async (id, context) => {
  const log = context.logger.start(`services:admins:currentadmin`);
  if (!id) {
    throw new Error("admin id is required");
  }
  let admin = await db.admin
    .findById(id)
    .populate("role")
    .populate("agency")
    .populate("clients")
    .populate("course")

  if (!admin) {
    throw new Error("admin not found");
  }
  admin = await admin.populate("agency.manager").execPopulate();
  log.end();
  return admin;
};

const currentadmin = async (id, model, context) => {
  const log = context.logger.start(`services:admins:currentadmin`);
  if (!id) {
    throw new Error("admin id is required");
  }
  let admin = await db.admin
    .findById(id)
    .populate("role")
    .populate("agency")
    .populate("clients");
  if (!admin) {
    throw new Error("admin not found");
  }
  admin = await admin.populate("agency.manager").execPopulate();
  log.end();
  return admin;
};
const getAll = async (query, context) => {
  const log = context.logger.start("services:admins:getAll");
  console.log("query", query);
  // let admins = await db.admin.find({}).populate("role").populate("agency");
  // // let data =[]
  // for (let admin of admins) {
  //     admin = await admin.populate('agency.manager').execPopulate();
  //     data.push(admin);
  // }
  // admins = await admins.populate('agency.manager').execPopulate()
  let pageNo = query.pageNo ? query.pageNo - 1 : 0;
  let pageSize = parseInt(query.pageSize || 10);
  pageSize = pageSize < 0 ? 10 : pageSize;
  
  let skipCount = pageSize * pageNo;
  console.log("skipCount", skipCount);
  console.log("pageSize", pageSize);
  const listResult = await db.admin.aggregate([
      {
        $match: {role:{$ne:ObjectId("62a6e952e7e28674a15f9e1b")}}
      },
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'role',
        },
      },{
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'course',
        },
      },
      // { $limit:pageSize},
      // { $skip: skipCount },
      { $limit: pageSize + skipCount },
      { $skip: skipCount },
    ])
   const countResult= await db.admin.find({role:{$ne:ObjectId("62a6e952e7e28674a15f9e1b")}}).count()
  
  log.end();
  return {
    cruuentPage: query.pageNo,
    totalCount: countResult,
    admins: listResult,
  };
  //   log.end();
  //   return admins;
};

const forgotPassword = async (model, context) => {
  const log = context.logger.start("services:admins:forgetPassword");
  const admin = await db.admin.findOne({ email: model.email });
  if (!admin) {
    throw new Error("This Email is not valid");
  }
  let randomDigits = "123456789";
  let randomLetters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  let randomResult = "";
  const email = admin.email;
  const startingCharacters = email.substring(0, 4);

  for (let i = 0; i < 3; i++) {
    randomResult +=
      randomDigits[Math.floor(Math.random() * randomDigits.length)];
    randomResult +=
      randomLetters[Math.floor(Math.random() * randomLetters.length)];
  }
  const newPassword = startingCharacters + randomResult;
  console.log("passwords", newPassword);
  admin.password = crypto.getHash(newPassword, context);

  const subject = "Password Changed";
  const message = `Hi ${admin.firstName}${admin.lastName} your temporary password : <strong>${newPassword}</strong>`;
  const mailSent = await sendMail(email, message, subject);
  if (!mailSent) {
    throw new Error("Something went wrong");
  } else {
    await admin.save();
  }

  log.end();
  return admin;
};

const changePassword = async (id, model, context) => {
  const log = context.logger.start("services:admins:changePassword");
  const admin = await db.admin.findById({ _id: id });
  if (!admin) {
    throw new Error("admin not found");
  }
  // const isMatched = crypto.compareHash(
  //     model.oldPassword,
  //     admin.password,
  //     context
  // )
  // if (!isMatched) {
  //     throw new Error('Your old password is incorrect')
  // }
  admin.password = crypto.getHash(model.newPassword, context);
  admin.updatedOn = new Date();
  await admin.save();
  log.end();
  return "Your password has been Changed";
};

const sendMail = async (email, message, subject) => {
  let smtTransport = new nodemailer.createTransport({
    service: "Gmail",
    auth: {
      admin: `meandersoftwaretesting@gmail.com`,
      pass: `zozjukhxqdgpbjmn`,
    },
  });
  let mailTo = {
    from: "CKI",
    to: email,
    subject: subject,
    html: message,
  };
  try {
    console.log("reached mail");
    const mailSended = await smtTransport.sendMail(mailTo);
    if (mailSended) {
      console.log("mail sent id", mailSended.messageId);
      console.log("Url", nodemailer.getTestMessageUrl(mailSended));
      return true;
    } else {
      throw new Error("Unable to send email try after sometime");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const adminProfilePicture = async (id, files, context) => {
  const log = context.logger.start("services:admins:adminProfilePic");
  const admin = await db.admin.findById({ _id: id });
  if (!files) {
    throw new Error("Please select a Picture");
  }
  if (!admin) {
    throw new Error("admin not found");
  }
  if (admin.image !== "" && admin.image !== undefined) {
    const picUrl = admin.image.replace(`${imgUrl}`, "./assets/images/");
    try {
      fs.unlink(picUrl, function (err) {
        if (err) {
          //  new Error('Something went wrong')
          consolethrow.log(err);
        } else {
          console.log("profile upload complete");
        }
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
  const uploadedImage = `${imgUrl}` + files[0].filename;
  admin.image = uploadedImage;
  await admin.save();
  log.end();
  return "profile Uploaded Successfuly";
};
// const getByAgency = async (agencyId, context) => {
//   const log = context.logger.start("services:admins:getByAgency");
//   const agencyadmins = await db.admin
//     .find({ agency: agencyId })
//     .populate("role")
//     .populate("clients")
//     .populate("agency")
//     .sort({ updatedOn: -1 });
// if (agencyadmins.length === 0) {
//     throw new Error("Agency's employees not found");
// }
//   let datas = [];
//   for (let data of agencyadmins) {
//     if (data.role.type === "employee") {
//       datas.push(data);
//     }
//   }
//   if (datas.length === 0) {
//     throw new Error("Employee not found");
//   }
//   log.end();
//   return datas;
// };

const sendOtp = async (id, context) => {
  const log = context.logger.start("services:admins:sendOtp");
  const manager = await db.managers.findOne({ _id: id });

  let digits = "1234657890";
  let randomOtp = "";
  for (let i = 0; i < 4; i++) {
    randomOtp += digits[Math.floor(Math.random() * digits.length)];
  }
  let message = `This is your One time Password : ${randomOtp}`;
  let subject = "One Time Password";
  console.log(randomOtp, manager);
  await sendMail(manager.email, message, subject);
  const token = auth.getOtpToken(randomOtp, id, true, context);
  const data = {
    token: token,
    message: "OTP successfully sent on your email",
  };

  log.end();
  return data;
};
const getEmployees = async (_model, context) => {
  const log = context.logger.start("services:admins:getEmployees");
  const getEmployees = await db.admin.find().populate("role").populate("agency");
  let data = [];
  for (let employee in getEmployees) {
    if (getEmployees[employee].role.type === "employee") {
      data.push(getEmployees[employee]);
    }
    // console.log(getEmployees[employee].role)
  }
  console.log(data);
  log.end();
  return data;
};

const verifyOtp = async (model, context) => {
  const log = context.logger.start("services:admins:verifyOtp");

  const extractToken = auth.extractToken(model.token, context);
  if (!extractToken) {
    throw new Error("Otp Token is requried");
  }
  if (extractToken.otp !== model.otp) {
    throw new Error("Your OTP is wrong");
  }
  if (extractToken.name === "TokenExpiredError") {
    throw new Error("otp expired");
  }
  if (extractToken.name === "JsonWebTokenError") {
    throw new Error("otp is invalid");
  }
  const data = {
    otpToken: model.token,
    message: "opt verify successfuly",
  };
  log.end();
  return data;
};

///////////////////////

// const signtureUpdate = async (id, files, context) => {
//   const log = context.logger.start("services:admins:signtureUpdate");
//   let admin = await db.admin
//     .findById({ _id: id })
//     .populate("role")
//     .populate("agency");
//   if (!files) {
//     throw new Error("Please select a Picture");
//   }
//   if (!admin) {
//     throw new Error("admin not found");
//   }
//   admin = await admin.populate("agency.manager").execPopulate();
//   if (admin.signature !== "" && admin.signature !== undefined) {
//     const picUrl = admin.signature.replace(`${imgUrl}`, "./assets/images/");
//     try {
//       fs.unlink(picUrl, function (err) {
//         if (err) {
//           //throw new Error('Something went wrong')
//           console.log(err);
//         } else {
//           console.log("profile upload complete");
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       throw new Error(err.message);
//     }
// //   }
//   const uploadedImage = `${imgUrl}` + files[0].filename;
//   admin.signature = uploadedImage;
//   await admin.save();
//   log.end();
//   return admin;
// };

const searchEmployees = async (query, context) => {
  const log = context.logger.start("services:admins:searchEmployees");
  const getEmployees = await db.admin
    .find({ fullName: { $regex: "^.*" + query.search + ".*", $options: "i" } })
    .populate("role");
  let data = [];
  for (let employee of getEmployees) {
    if (employee.role.type === "employee") {
      data.push(employee);
    }
    // console.log(getEmployees[employee].role)
  }
  console.log(data);
  log.end();
  return data;
};

const search = async (query, context) => {
  const log = context.logger.start(`services:admins:search`);
  let searchQuery = {'role._id':{$ne:ObjectId("62a6e952e7e28674a15f9e1b")}};
  if (
    query.name !== undefined &&
    query.name !== "" &&
    query.name !== null
  )
   
  {
    searchQuery["$or"] = [{
      'course.courseName':{
      $regex: ".*" + query.name + ".*",
      $options: "i",
      }
    },
    {name:{
      $regex: ".*" + query.name + ".*",
      $options: "i",
    }
  }];
  }
  if (query.role !== undefined && query.role !== "" && query.role !== null) {
    searchQuery.$and = [{'role._id':ObjectId(query.role)}]
  }
  // const admins = await db.admin.find(searchQuery).populate("role");
  console.log(searchQuery)
  const admins = await db.admin.aggregate([
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {$match:searchQuery},
  ])

  // .sort({fullName:-1})
  // .limit(5);

  return admins;
};
// const searchEmployeeByAgency = async (query, context) => {
//   const log = context.logger.start("services:admins:searchEmployeesByAgency");
//   if (query.agencyId && query.search) {
//     const getEmployees = await db.admin
//       .find({
//         agency: query.agencyId,
//         fullName: { $regex: "^.*" + query.search + ".*", $options: "i" },
//       })
//       .populate("role");
//     let data = [];
//     for (let employee of getEmployees) {
//       if (employee.role.type === "employee") {
//         data.push(employee);
//       }
//     }
//     log.end();
//     return data;
//   }
// };

// const managerLogin = async (model, context) => {
//   const log = context.logger.start("services:admins:managerLogin");
//   // admin token
//   if (!model.token) throw new Error("Token required for login");
//   ////extract token
//   const adminData = auth.extractToken(model.token, context);
//   if (!adminData) throw new Error("Token mismatch");

//   if (adminData.name === "TokenExpiredError") {
//     throw new Error("Token expired");
//   }
//   if (adminData.name === "JsonWebTokenError") {
//     throw new Error("Invailid token");
//   }
// /// check is Admin
// const isAdmin = await db.admin
//   .findById({ _id: adminData._id })
//   .populate("role");

// if (!isAdmin) throw new Error("Invalid admin");

// if (isAdmin.role.type !== "admin") {
//   throw new Error("Authentication failed !!");
// }
//   //manager id
//   let data = await db.admin
//     .findOne({ _id: model.managerId })
//     .populate(["agency", "role"]);
//   data = await data.populate("agency.manager").execPopulate();
//   log.end();
//   console.log(data);
//   return data;
// };

// const adminLogin = async (model, context) => {
//   const log = context.logger.start("services:admins:adminLogin");
//   if (!model.token) throw new Error("Token required for login");
//   ////extract token
//   const adminData = auth.extractToken(model.token, context);
//   if (!adminData) throw new Error("Token mismatch");

//   if (adminData.name === "TokenExpiredError") {
//     throw new Error("Token expired");
//   }
//   if (adminData.name === "JsonWebTokenError") {
//     throw new Error("Invailid token");
//   }
//   const adminId = adminData._id;
//   const admin = await db.admin.findOne({ _id: adminId }).populate("role");
//   if (admin.role.type == undefined || admin.role.type !== "admin") {
//     throw new Error("Authentication failed !!");
//   }
//   if (!admin) throw new Error("Admin not found");
//   log.end();
//   return admin;
// };
exports.create = create;
exports.login = login;
exports.update = update;
exports.deleteadmin = deleteadmin;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.getAll = getAll;
exports.currentadmin = currentadmin;
exports.getById = getById;
exports.adminProfilePicture = adminProfilePicture;
// exports.getByAgency = getByAgency;
exports.sendOtp = sendOtp;
exports.getEmployees = getEmployees;
exports.verifyOtp = verifyOtp;
// exports.signtureUpdate = signtureUpdate;
exports.searchEmployees = searchEmployees;
exports.search = search;
// exports.searchEmployeeByAgency = searchEmployeeByAgency;
// exports.managerLogin = managerLogin;
// exports.adminLogin = adminLogin;
