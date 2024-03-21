const crypto = require("../permit/crypto");
const auth = require("../permit/auth");
const nodemailer = require("nodemailer");
const imgUrl = require("config").get("image").url;
const config = require("config").get("auth");
const fs = require("fs");
const path = require("path");
const { model } = require("mongoose");
const { query } = require("../models/user");
const ObjectId = require('mongodb').ObjectID

// const build = async (model, files, context, isManager) => {
//   const log = context.logger.start("services:users:build");

//   let userSignature;
//   if (files[0] !== undefined) {
//     userSignature = `${imgUrl}` + files[0].filename;
//   } else {
//     userSignature = "";
//   }
//   userSignature.toString();
//   let user = new db.user({
//     fullName: model.fullName,
//     email: model.email,
//     phoneNumber: model.phoneNumber,
//     position: model.position,
//     role: model.role,
//     agency: model.agencyId,
//     salary: model.salary,
//     DOB: model.DOB,
//     signature: userSignature,
//     address: model.address,
//     password: model.password,
//   });
//   if (isManager === "manager") {
//     const agency = await db.agencie.findOne({ _id: model.agencyId });
//     console.log(agency);
//     agency.manager = user.id;
//     console.log(user.id);
//     await agency.save();
//   }
//   await user.save();
//   log.end();
//   return user;
// };

// const create = async (model, files, context) => {
//   const log = context.logger.start("services:users:create");

//   const isExist = await db.user.findOne({
//     $or: [{ email: model.email }, { phoneNumber: model.phoneNumber }],
//   });
//   if (isExist) {
//     throw new Error("User already exists");
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
//   const user = await build(model, files, context, isManager);

//   log.end();
//   return user;
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
  const log = context.logger.start(`services:users:build${model,file}`);
  const user = await db
    .user({
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
  return user;
};

const create = async (model,file, context) => {
  const log = context.logger.start("services:users:create");
  const isEmail = await db.user.findOne({ email: { $eq: model.email } });
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
 
  const user = await build(model,file, context);
  console.log("user",user)
  log.end();
  return user;
};

const login = async (model, context) => {
  const log = context.logger.start("services:users:login");
  let user = await db.user
    .findOne({ email: model.email })
    .populate(["role", "agency", "clients"]);

  if (!user) throw new Error("user not found");
  // if (user.role.type !== "admin") {
  //   if (model.agencyName !== user.agency.name) {
  //     throw new Error("Agency not found");
  //   }
  //   if (user.agency.deactivated == true) {
  //     throw new Error("Your Agency has beed deactivated");
  //   }
  // }

  if (!user) {
    throw new Error("User email not found");
  }
  const isMatched = crypto.compareHash(model.password, user.password, context);
  if (!isMatched) {
    throw new Error("Password mismatch found");
  }
  // user = await user.populate("agency.manager").execPopulate();
  const token = auth.getToken(user.id, true, context);
  user.token = token;
  user.save();
  log.end();
  return user;
};

const setUser = async (model, user,files, context) => {
  const log = context.logger.start(`services:users:setUser`);

  if (model.name !== "" && model.name !== undefined) {
    user.name = model.name;
  }
  // if (model.email !== "" && model.email !== undefined) {
  //   user.email = model.email;
  // }
  if (model.phoneNumber !== "" && model.phoneNumber !== undefined) {
    user.phoneNumber = model.phoneNumber;
  }
  if (model.college !== "" && model.college !== undefined) {
    user.college = model.college;
  }
  if (model.course !== "" && model.course !== undefined) {
    user.course = model.course;
  }
  if (
    model.lastQualification !== "" &&
    model.lastQualification !== undefined
  ) {
    user.lastQualification = model.lastQualification;
  }
 
  // if (model.fullName !== "" && model.fullName !== undefined) {
  //   user.fullName = model.fullName;
  // }
  // if (model.position !== "" && model.position !== undefined) {
  //   user.position = model.position;
  // }

  // if (model.DOB !== "" && model.DOB !== undefined) {
  //   user.DOB = model.DOB;
  // }
  // if (model.address !== "" && model.address !== undefined) {
  //   user.address = model.address;
  // }
  // if (model.status !== "" && model.status !== undefined) {
  //   user.status = model.status;
  // }Cannot convert object to primitive value"
  // if (model.salary !== "" && model.salary !== undefined) {
  //   user.salary = model.salary;
  // }
  //  if (model.trainingPeriod !== "" && model.trainingPeriod !== undefined) {
  //   user.trainingPeriod = model.trainingPeriod;
  // }
  // if (model.sessionStarted !== "" && model.sessionStarted !== undefined) {
  //   user.sessionStarted = model.sessionStarted;
  // }
  // if (model.courseFee !== "" && model.courseFee !== undefined) {
  //   user.courseFee = model.courseFee;
  // }
  // if (model.submittedFee !== "" && model.submittedFee !== undefined) {
  //   user.submittedFee = model.submittedFee;
  // }
  // if (model.pending !== "" && model.pending !== undefined) {
  //   user.pending = model.pending;
  // }
  // if (model.placementStatus !== "" && model.placementStatus !== undefined) {
  //   user.placementStatus = model.placementStatus;user
  // }
  // if (model.clients !== "" && model.clients !== undefined) {
  //   user.clients = model.clients;
  // }
  if (model.password !== ""&&model.password !== "" && model.password !== undefined) {
    let newPassword = crypto.getHash(model.password, context);
    console.log(model.password);
    console.log(newPassword);
    user.password = newPassword;
  }
  if (files.length > 0) {
    if (user.image != "" && user.image !== undefined) {
      let picUrl = user.image;
      try {
        const paths = path.resolve(__dirname, "../") + "/assets/images";
        await fs.unlinkSync(`${paths}/${picUrl}`);
        user.image = files[0].filename;
      } catch (err) {
        console.log(err);
      }
    } else {
      user.image = files[0].filename;
    }
  }
  user.updatedOn = new Date();
  await user.save();
  log.end();
  return user;
};
const update = async (id, model,files, context) => {
  const log = context.logger.start(`services:users:update`);

  const user = await db.user.findById({ _id: id });
  if (!user) {
    throw new Error(`User not found`);
  }
  const userUpdated = await setUser(model, user,files, context);
  log.end();
  return userUpdated;
};

const deleteUser = async (id, context) => {
  const log = context.logger.start(`services:users:deleteUser`);

  if (!id) {
    throw new Error("id is requried");
  }

  let user = await db.user.findByIdAndDelete({ _id: id });
  const deleteTimeSheet = await db.timeSheet.deleteMany({ userId: id });
  const deleteExpense = await db.expense.deleteMany({ userId: id });

  if (!user) {
    throw new Error("user not found");
  }
  log.end();
  return user;
};

const getById = async (id, context) => {
  const log = context.logger.start(`services:users:currentUser`);
  if (!id) {
    throw new Error("user id is required");
  }
  let user = await db.user
    .findById(id)
    .populate("role")
    .populate("agency")
    .populate("clients")
    .populate("course")

  if (!user) {
    throw new Error("user not found");
  }
  user = await user.populate("agency.manager").execPopulate();
  log.end();
  return user;
};

const currentUser = async (id, model, context) => {
  const log = context.logger.start(`services:users:currentUser`);
  if (!id) {
    throw new Error("user id is required");
  }
  let user = await db.user
    .findById(id)
    .populate("role")
    .populate("agency")
    .populate("clients");
  if (!user) {
    throw new Error("user not found");
  }
  user = await user.populate("agency.manager").execPopulate();
  log.end();
  return user;
};
const getAll = async (query, context) => {
  const log = context.logger.start("services:users:getAll");
  console.log("query", query);
  // let users = await db.user.find({}).populate("role").populate("agency");
  // // let data =[]
  // for (let user of users) {
  //     user = await user.populate('agency.manager').execPopulate();
  //     data.push(user);
  // }
  // users = await users.populate('agency.manager').execPopulate()
  let pageNo = query.pageNo ? query.pageNo - 1 : 0;
  let pageSize = parseInt(query.pageSize || 10);
  pageSize = pageSize < 0 ? 10 : pageSize;
  
  let skipCount = pageSize * pageNo;
  console.log("skipCount", skipCount);
  console.log("pageSize", pageSize);
  const listResult = await db.user.aggregate([
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
   const countResult= await db.user.find({role:{$ne:ObjectId("62a6e952e7e28674a15f9e1b")}}).count()
  
  log.end();
  return {
    cruuentPage: query.pageNo,
    totalCount: countResult,
    users: listResult,
  };
  //   log.end();
  //   return users;
};

const forgotPassword = async (model, context) => {
  const log = context.logger.start("services:users:forgetPassword");
  const user = await db.user.findOne({ email: model.email });
  if (!user) {
    throw new Error("This Email is not valid");
  }
  let randomDigits = "123456789";
  let randomLetters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  let randomResult = "";
  const email = user.email;
  const startingCharacters = email.substring(0, 4);

  for (let i = 0; i < 3; i++) {
    randomResult +=
      randomDigits[Math.floor(Math.random() * randomDigits.length)];
    randomResult +=
      randomLetters[Math.floor(Math.random() * randomLetters.length)];
  }
  const newPassword = startingCharacters + randomResult;
  console.log("passwords", newPassword);
  user.password = crypto.getHash(newPassword, context);

  const subject = "Password Changed";
  const message = `Hi ${user.firstName}${user.lastName} your temporary password : <strong>${newPassword}</strong>`;
  const mailSent = await sendMail(email, message, subject);
  if (!mailSent) {
    throw new Error("Something went wrong");
  } else {
    await user.save();
  }

  log.end();
  return user;
};

const changePassword = async (id, model, context) => {
  const log = context.logger.start("services:users:changePassword");
  const user = await db.user.findById({ _id: id });
  if (!user) {
    throw new Error("User not found");
  }
  // const isMatched = crypto.compareHash(
  //     model.oldPassword,
  //     user.password,
  //     context
  // )
  // if (!isMatched) {
  //     throw new Error('Your old password is incorrect')
  // }
  user.password = crypto.getHash(model.newPassword, context);
  user.updatedOn = new Date();
  await user.save();
  log.end();
  return "Your password has been Changed";
};

const sendMail = async (email, message, subject) => {
  let smtTransport = new nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: `meandersoftwaretesting@gmail.com`,
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

const userProfilePicture = async (id, files, context) => {
  const log = context.logger.start("services:users:userProfilePic");
  const user = await db.user.findById({ _id: id });
  if (!files) {
    throw new Error("Please select a Picture");
  }
  if (!user) {
    throw new Error("User not found");
  }
  if (user.image !== "" && user.image !== undefined) {
    const picUrl = user.image.replace(`${imgUrl}`, "./assets/images/");
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
  user.image = uploadedImage;
  await user.save();
  log.end();
  return "profile Uploaded Successfuly";
};
// const getByAgency = async (agencyId, context) => {
//   const log = context.logger.start("services:users:getByAgency");
//   const agencyUsers = await db.user
//     .find({ agency: agencyId })
//     .populate("role")
//     .populate("clients")
//     .populate("agency")
//     .sort({ updatedOn: -1 });
// if (agencyUsers.length === 0) {
//     throw new Error("Agency's employees not found");
// }
//   let datas = [];
//   for (let data of agencyUsers) {
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
  const log = context.logger.start("services:users:sendOtp");
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
  const log = context.logger.start("services:users:getEmployees");
  const getEmployees = await db.user.find().populate("role").populate("agency");
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
  const log = context.logger.start("services:users:verifyOtp");

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
//   const log = context.logger.start("services:users:signtureUpdate");
//   let user = await db.user
//     .findById({ _id: id })
//     .populate("role")
//     .populate("agency");
//   if (!files) {
//     throw new Error("Please select a Picture");
//   }
//   if (!user) {
//     throw new Error("User not found");
//   }
//   user = await user.populate("agency.manager").execPopulate();
//   if (user.signature !== "" && user.signature !== undefined) {
//     const picUrl = user.signature.replace(`${imgUrl}`, "./assets/images/");
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
//   user.signature = uploadedImage;
//   await user.save();
//   log.end();
//   return user;
// };

const searchEmployees = async (query, context) => {
  const log = context.logger.start("services:users:searchEmployees");
  const getEmployees = await db.user
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
  const log = context.logger.start(`services:users:search`);
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
  // const users = await db.user.find(searchQuery).populate("role");
  console.log(searchQuery)
  const users = await db.user.aggregate([
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

  return users;
};
// const searchEmployeeByAgency = async (query, context) => {
//   const log = context.logger.start("services:users:searchEmployeesByAgency");
//   if (query.agencyId && query.search) {
//     const getEmployees = await db.user
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
//   const log = context.logger.start("services:users:managerLogin");
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
// const isAdmin = await db.user
//   .findById({ _id: adminData._id })
//   .populate("role");

// if (!isAdmin) throw new Error("Invalid user");

// if (isAdmin.role.type !== "admin") {
//   throw new Error("Authentication failed !!");
// }
//   //manager id
//   let data = await db.user
//     .findOne({ _id: model.managerId })
//     .populate(["agency", "role"]);
//   data = await data.populate("agency.manager").execPopulate();
//   log.end();
//   console.log(data);
//   return data;
// };

// const adminLogin = async (model, context) => {
//   const log = context.logger.start("services:users:adminLogin");
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
//   const user = await db.user.findOne({ _id: adminId }).populate("role");
//   if (user.role.type == undefined || user.role.type !== "admin") {
//     throw new Error("Authentication failed !!");
//   }
//   if (!user) throw new Error("Admin not found");
//   log.end();
//   return user;
// };
exports.create = create;
exports.login = login;
exports.update = update;
exports.deleteUser = deleteUser;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.getAll = getAll;
exports.currentUser = currentUser;
exports.getById = getById;
exports.userProfilePicture = userProfilePicture;
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
