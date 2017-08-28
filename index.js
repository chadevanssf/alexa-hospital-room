var express = require("express");
var alexa = require("alexa-app");

// require each of the alexa skills that are supported
var hospitalRoom = require("./alexa-apps/hospital-room");
var patientMeals = require("./alexa-apps/patient-meals");
// Add additional Alexa Skill Apps here and below

// use the environment var from Heroku if set
var PORT = process.env.PORT || 8080;
var IS_DEBUG = true;

var expressApp = express();

expressApp.set("view engine", "ejs");

// load the alexa apps, based on the required alexa skills apps
var hospitalRoomApp = hospitalRoom(expressApp, alexa, IS_DEBUG);
var patientMealsApp = patientMeals(expressApp, alexa, IS_DEBUG);
// Add additional Alexa Skill Apps here and above

// set up a default mapping so I don't have to know any of the names of the apps
var apps = [];
for (var key in alexa.apps) {
  apps.push("http://localhost:" + PORT + "/" + key);
}

if (IS_DEBUG) {
  expressApp.get("/", function (req, res) {
    res.render("list", {
      "apps": apps,
    });
  });
}

var appsToTest = apps.join("\n");
expressApp.listen(PORT, () => console.log("Listening on port " + PORT + ", try:\n" + appsToTest));
