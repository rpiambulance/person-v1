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
  const {
    err,
    res: {
      data: { users }
    }
  } = await admin.users.list({
    domain: "rpiambulance.com",
    projection: "full",
    maxResults: 500
  });
  if (err) return console.error("The API returned an error: ", err.message);
  if (users.length) {
    return users;
  } else {
    return console.error("No users found");
  }
};

const getUser = async id => {
  const {
    err,
    res: { data }
  } = await admin.users.get({
    userKey: id,
    projection: "full"
  });
  if (err) return console.error("The API returned an error: ", err.message);
  if (data.length) {
    return data;
  } else {
    return console.error("No user found");
  }
};

module.exports = { getUsers, getUser };
