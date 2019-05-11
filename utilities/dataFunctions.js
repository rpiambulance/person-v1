//node packages
const { google } = require("googleapis");

//local packages
const privatekey = require("../keys/person-api.json");

//globals

//package configuration
// dotenv.config();

//local configuration
const jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ["https://www.googleapis.com/auth/admin.directory.user.readonly"],
  "events@rpiambulance.com"
);

const admin = google.admin({
  version: "directory_v1",
  auth: jwtClient
});

jwtClient.authorize(err => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected!");
  }
});

//functions
const getUsers = async () => {
  try {
    const {
      data: { users }
    } = await admin.users.list({
      domain: "rpiambulance.com",
      projection: "full",
      maxResults: 500
    });
    if (users.length) return users;
  } catch (error) {
    return console.error("getUser return an error: ", error);
  }
};

const getUser = async id => {
  try {
    const res = await admin.users.get({
      userKey: id,
      projection: "full"
    });
    if (res) return res;
  } catch (error) {
    return console.error("getUser return an error: ", error);
  }
};

module.exports = { getUsers, getUser };
