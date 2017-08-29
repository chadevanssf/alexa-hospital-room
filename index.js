const express = require("express");
const alexa = require("alexa-app");

const dbUtil = require("./util/db-util");

// require each of the alexa skills that are supported
const hospitalRoom = require("./alexa-apps/hospital-room");
const patientMeals = require("./alexa-apps/patient-meals");
// Add additional Alexa Skill Apps here and below

// use the environment var from Heroku if set
const PORT = process.env.PORT || 8088;
const IS_DEBUG = process.env.NODE_ENV != "production";

const expressApp = express();

expressApp.set("view engine", "ejs");

// load the alexa apps, based on the required alexa skills apps
const hospitalRoomApp = hospitalRoom.getApp(expressApp, alexa, IS_DEBUG);
const patientMealsApp = patientMeals(expressApp, alexa, IS_DEBUG);
// Add additional Alexa Skill Apps here and above

// set up a default mapping so I don't have to know any of the names of the apps
let apps = [];
for (var key in alexa.apps) {
  apps.push("/" + key);
}

if (IS_DEBUG) {
  expressApp.get("/", function (req, res) {
    res.render("list", {
      "apps": apps,
    });
  });

  expressApp.get("/db", dbUtil.renderTest);
}

let appsToTest = "http://localhost:" + PORT + apps.join("\nhttp://localhost:" + PORT);
const server = expressApp.listen(PORT, () => {
  console.log("Listening on port " + PORT + ", try:\n" + appsToTest + "\n");
});

process.on('SIGTERM', function () {
  dbUtil.closePool();
  server.close(() => {
    console.log("Server Closed.");
  });
  process.exit(0);
});
