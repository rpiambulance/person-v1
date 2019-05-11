//node packages
const express = require("express");
const os = require("os");
require("dotenv").config();

//local packages
const packageSpecs = require("./package.json");
const { getUsers, getUser } = require("./utilities/dataFunctions.js");

//globals
const API_TOKEN = process.env.API_TOKEN;
const ENV = process.env.NODE_ENV || "dev";
const PORT = process.env.NODE_PORT || 3000;
const HOST = os.hostname();

//package configuration
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

app.get("/get/users", async (req, res) => {
  if (!req.query.token || req.query.token !== API_TOKEN) {
    res.status(401).send({
      error: true,
      code: 401,
      message: "You did not provide a valid API token."
    });
  } else {
    res.send(await getUsers());
  }
});

app.get("/get/user/:id", async (req, res) => {
  if (!req.query.token || req.query.token !== API_TOKEN) {
    res.status(401).send({
      error: true,
      code: 401,
      message: "You did not provide a valid API token."
    });
  } else {
    res.send(await getUser(req.params.id));
  }
});

app.listen(PORT, () => {
  console.log(`DC Info API running on port ${PORT}`);
});
