//node packages
const express = require("express");
const os = require("os");
const dotenv = require("dotenv");
const { google } = require("googleapis");

//local packages
const packageSpecs = require("./package.json");
const {} = require("./utilities/dataFunctions.js");
const privatekey = require("./keys/person-api.json");

//globals
const ENV = process.env.NODE_ENV || "dev";
const PORT = process.env.NODE_PORT || 3000;
const HOST = os.hostname();

//package configuration
dotenv.config();
const app = express();

//local configuration

//helper functions

//api endpoints
app.get("/health", (req, res) => {
  res.send({
    health: {
      message: "SERVER OK",
      HOST,
      ENV,
      version: packageSpecs.version,
      cpus: os.cpus().length,
      uptime: os.uptime()
    }
  });
});

////////////////////

const jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ["https://www.googleapis.com/auth/admin.directory.user.readonly"],
  "events@rpiambulance.com"
);
//authenticate request
jwtClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected!");
  }
});

const admin = google.admin({
  version: "directory_v1",
  auth: jwtClient
});

admin.users.list(
  { domain: "rpiambulance.com", projection: "full", maxResults: 500 },
  (err, res) => {
    if (err) return console.error("The API returned an error:", err.message);
    const users = res.data.users;
    if (users.length) {
      console.log("Users:");
      users.forEach(user => {
        console.log(user);
      });
    } else {
      console.log("No users found.");
    }
  }
);

////////////////////

app.listen(PORT, () => {
  console.log(`DC Info API running on post ${PORT}`);
});
