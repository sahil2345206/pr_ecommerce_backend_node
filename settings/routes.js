"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit");
const validator = require("../validators");

const configure = (app, logger) => {
  const log = logger.start("settings:routes:configure");
  app.get("/specs", function (req, res) {
    fs.readFile("./public/specs.html", function (err, data) {
      if (err) {
        return res.json({
          isSuccess: false,
          error: err.toString(),
        });
      }
      res.contentType("text/html");
      res.send(data);
    });
  });

  app.get("/api/specs", function (req, res) {
    res.contentType("application/json");
    res.send(specs.get());
  });

  //user api's //
  app.post(
    "/api/users/create",
    permit.context.builder,
    validator.users.create,
    api.users.create
  );

  app.post(
    "/api/users/login",
    permit.context.builder,
    validator.users.login,
    api.users.login
  );

  app.get(
    "/api/users/getById/:id",
    permit.context.validateToken,
    api.users.getById
  );

  app.put(
    "/api/users/changePassword/:id",
    permit.context.validateToken,
    api.users.changePassword,
    validator.users.changePassword
  );

  app.put(
    "/api/users/update/:id",
    permit.context.validateToken,
    api.users.update
  );
  app.get(
        "/api/users/search",
        permit.context.validateToken,
        api.users.search
    );

  app.post(
    "/api/users/forgotPassword",
    permit.context.builder,
    api.users.forgotPassword
  );

  app.delete(
    "/api/users/delete/:id",
    permit.context.validateToken,
    api.users.deleteUser
  );

  app.get(
    "/api/users/getAll",
    permit.context.validateToken,
    api.users.getAll
  );
  app.put(
    "/api/users/uploadProfile/:id",
    permit.context.validateToken,
    api.users.userProfilePicture
  );
  // app.get(
  //   "/api/users/getAgencyUsers/:agencyId",
  //   permit.context.validateToken,
  //   api.users.agencyUsres
  // );
  app.get("/api/users/sendOtp/:id", permit.context.builder, api.users.sendOtp);
  app.post("/api/users/verifyOtp", permit.context.builder, api.users.verifyOtp);
  app.get(
    "/api/users/getEmployees",
    permit.context.validateToken,
    api.users.getEmployees
  );
  // app.put(
  //   "/api/users/signatureUpdate/:id",
  //   permit.context.validateToken,
  //   api.users.signtureUpdate
  // );
  app.get(
    "/api/users/searchEmployees",
    permit.context.validateToken,
    api.users.searchEmployees
  );
  // app.get(
  //   "/api/users/searchEmployeeByAgency",
  //   permit.context.validateToken,
  //   api.users.searchEmployeeByAgency
  // );
  // app.post(
  //   "/api/users/managerLogin",
  //   permit.context.builder,
  //   api.users.managerLogin
  // );
  // app.post(
  //   "/api/users/adminLogin",
  //   permit.context.builder,
  //   api.users.adminLogin
  // );



  //admin api's //
  app.post(
    "/api/admins/create",
    permit.context.builder,
    validator.admins.create,
    api.admins.create
  );

  app.post(
    "/api/admins/login",
    permit.context.builder,
    validator.admins.login,
    api.admins.login
  );

  app.get(
    "/api/admins/getById/:id",
    permit.context.validateToken,
    api.admins.getById
  );

  app.put(
    "/api/admins/changePassword/:id",
    permit.context.validateToken,
    api.admins.changePassword,
    validator.admins.changePassword
  );

  app.put(
    "/api/admins/update/:id",
    permit.context.validateToken,
    api.admins.update
  );
  app.get(
        "/api/admins/search",
        permit.context.validateToken,
        api.admins.search
    );

  app.post(
    "/api/admins/forgotPassword",
    permit.context.builder,
    api.admins.forgotPassword
  );

  app.delete(
    "/api/admins/delete/:id",
    permit.context.validateToken,
    api.admins.deleteUser
  );

  app.get(
    "/api/admins/getAll",
    permit.context.validateToken,
    api.admins.getAll
  );
  app.put(
    "/api/admins/uploadProfile/:id",
    permit.context.validateToken,
    api.admins.userProfilePicture
  );
  // app.get(
  //   "/api/admins/getAgencyadmins/:agencyId",
  //   permit.context.validateToken,
  //   api.admins.agencyUsres
  // );
  app.get("/api/admins/sendOtp/:id", permit.context.builder, api.admins.sendOtp);
  app.post("/api/admins/verifyOtp", permit.context.builder, api.admins.verifyOtp);
  app.get(
    "/api/admins/getEmployees",
    permit.context.validateToken,
    api.admins.getEmployees
  );
  // app.put(
  //   "/api/admins/signatureUpdate/:id",
  //   permit.context.validateToken,
  //   api.admins.signtureUpdate
  // );
  app.get(
    "/api/admins/searchEmployees",
    permit.context.validateToken,
    api.admins.searchEmployees
  );
  // app.get(
  //   "/api/admins/searchEmployeeByAgency",
  //   permit.context.validateToken,
  //   api.admins.searchEmployeeByAgency
  // );
  // app.post(
  //   "/api/admins/managerLogin",
  //   permit.context.builder,
  //   api.admins.managerLogin
  // );
  // app.post(
  //   "/api/admins/adminLogin",
  //   permit.context.builder,
  //   api.admins.adminLogin
  // );


  //////agency
  
  //////roles
  app.post("/api/roles/create", permit.context.builder, api.roles.create);
  app.get("/api/roles/getRoles", permit.context.builder, api.roles.getRoles);
  app.delete(
    "/api/roles/delete/:id",
    permit.context.validateToken,
    api.roles.deleteRole
  );

          
  log.end();
};



exports.configure = configure;
