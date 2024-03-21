"use strict";

const express = require("express");
const appConfig = require("config").get("app");
const logger = require("@open-age/logger")("server");
const Http = require("http");
const https = require("https");
const fs = require("fs");
const port = process.env.PORT || appConfig.port || 3000;
const app = express();
var server = Http.createServer(app);
// const options = {
//   cert: fs.readFileSync(
//     '/etc/letsencrypt/live/crm.meander.software/fullchain.pem'
//   ),
//   key: fs.readFileSync(
//     '/etc/letsencrypt/live/crm.meander.software/privkey.pem'
//   ),
// };
// var server = https.createServer(options, app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const boot = () => {
  const log = logger.start("app:boot");
  log.info(`environment:  ${process.env.NODE_ENV}`);
  log.info("starting server");
  server.listen(port, () => {
    log.info(`listening on port: ${port}`);
    log.end();
  });
};

const init = async () => {
  app.use("/assets/images", express.static("assets/images"));
  await require("./settings/database").configure(logger);
  await require("./settings/express").configure(app, logger);
  await require("./settings/routes").configure(app, logger);
  boot();
};

init();
