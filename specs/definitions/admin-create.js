module.exports = [
  {
    name: "userCreate",
    properties: {
      //agencyId:{ type: "string"},
      // firstName: { type: "string", },
      // lastName: { type: "string", },
      //agency: { type: ""string"", },
      // image: { type: "string", },
      // fullName: { type: "string" },
      email: { type: "string" },
      // phoneNumber: { type: "number", required: true },
      // position: { type: "string" },
      // role: { type: "string", enum: ["admin", "manager", "employee"] },
      // salary: { type: "number", },
      // address: { type: "string" },
      // status: { type: "string", },
      // DOB: { type: "string" },
      password: { type: "string" },
      // college: { type: "string" },
      // course: { type: "string" },
      // trainingPeriod: { type: "string" },
      // sessionStarted: { type: "string" },
      // courseFee: { type: "string" },
      // submittedFee: { type: "string" },
      // pending: { type: "string" },
      // placementStatus: { type: "string" },
      Name: { type: "string",required: true },
      email: { type: "string", },
      college: { type: "string", },
      phoneNumber: { type: "  Number", },
      lastQualification: { type: "string", },
      interestedIn: { type: "string", },
      image: { type: "string", },
      course: [{ type: "string", enum: "course"}],
      role: { type: "string", enum: ["admin", "manager", "employee"] },
    },
  },
];
