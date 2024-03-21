const mongoose = require("mongoose");

const admin = new mongoose.Schema({
       
  name: { type: String, required: true, },
  email: { type: String, required: true },
  college: { type: String,},
  phoneNumber: { type: Number, required: true },
  lastQualification: { type: String, },
  image: { type: String, default: "" },
  role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
  course: { 
       type: mongoose.Schema.Types.ObjectId,
       ref: "course",
    },
   
     // fullName: { type: String, required: true, default: "" },
     // phoneNumber: { type: Number, required: ["this phone Number already taken"] },
    // salary: { type: Number, required: false },
    // position: { type: String  },
    // address: { type: String, required: true },
    // DOB: { type: String, require: true },
    password: { type: String, },
    token: { type: String, defult: "" },
    // course: { type: String },
    // status: { type: String, default: "active"},
    // trainingPeriod: { type: String },
    // sessionStarted: { type: String },
    // courseFee: { type: String },
    // submittedFee: { type: String },
    // pending: { type: String },
    // placementStatus: { type: String },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
    // signature: { type: String, default: "" },
    // clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "client" }],
    // agency: { type: mongoose.Schema.Types.ObjectId, ref: "agencie" },
});
mongoose.model("admin", admin);
module.exports = admin;
