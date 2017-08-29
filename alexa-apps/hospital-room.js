var pg = require("pg");

var statuses = require("../custom-slot-types/status_type");
var roomUtilities = require("./hospital-room-utilities");

// must match the intent slot names
const ROOM_NAME = "targetRoom";
const FLOOR_NAME = "targetFloor";
const STATUS_NAME = "updateStatus";

var hospitalRoom = {};

hospitalRoom.getApp = function(expressApp, alexa, isDebug) {

  // ALWAYS setup the alexa app and attach it to express before anything else.
  let app = new alexa.app("alexa-hospital-room");

  app.express({
    expressApp: expressApp,
    //router: appRouter,

    // verifies requests come from amazon alexa. Must be enabled for production.
    // You can disable this if you're running a dev environment and want to POST
    // things to test behavior. enabled by default.
    checkCert: !isDebug,

    // sets up a GET route when set to true. This is handy for testing in
    // development, but not recommended for production. disabled by default
    debug: isDebug
  });

  // now POST calls to /{app.name} in express will be handled by the app.request() function

  app.launch(function(request, response) {
    response.say("Welcome to the Hospital Room Manager! Ask for rooms to be cleaned or to mark a room as cleaned.");
  });

  app.dictionary = statuses;

  app.intent("getFloorIntent", {
    "slots": {
        "targetFloor": "AMAZON.NUMBER"
      },
    "utterances": [
        "{I am|I'm|} on floor {-|" + FLOOR_NAME + "}",
        "{I am|I'm|} on the {-|" + FLOOR_NAME + "} {floor|}"
      ]
    },
    function(request, response) {
      let fl = request.slot(FLOOR_NAME); // returns undefined when not found
      console.log("info: " + fl);

      roomUtilities.setFloor(request, fl);

      response.say("Now set to floor " + fl);
      return;
    }
  );

  app.intent("updateRoomIntent", {
      "slots": {
        "targetRoom": "AMAZON.NUMBER",
        "targetFloor": "AMAZON.NUMBER",
        "updateStatus": "STATUS_TYPE"
      },
      "utterances": [
        "{room|} {-|" + ROOM_NAME + "} {floor|} {-|" + FLOOR_NAME + "} {-|" + STATUS_NAME + "}",
        "update {room|} {-|" + ROOM_NAME + "} {to|} {-|" + STATUS_NAME + "}",
        "update {room|} {-|" + ROOM_NAME + "} on floor {-|" + FLOOR_NAME + "} {to|} {-|" + STATUS_NAME + "}",
        "update {room|} {-|" + ROOM_NAME + "} on the {-|" + FLOOR_NAME + "} {floor|} {to|} {-|" + STATUS_NAME + "}"
      ]
    },
    function(request, response) {
      let rm = request.slot(ROOM_NAME); // returns undefined when not found
      let fl = request.slot(FLOOR_NAME); // returns undefined when not found
      let st = request.slot(STATUS_NAME); // returns undefined when not found
      console.log("info: " + rm + ", " + fl + ", " + st);

      // check to see if we either have the floor or have set the floor previously
      roomUtilities.getAndSetFloor(request, fl);

      // determine if we should do a follow on to ask for the floor
      /*if (!fl) {
        response.say("What floor is the room on?")
                .shouldEndSession(false)
                .reprompt("I didn't get the floor, what was it again?")
                .send();
        return;
      } else {*/

        // todo: search the database to see the current status and to update it

        response.say("Room " + rm + " on floor " + fl + " was updated successfully to " + st);
        return;
      //}
    }
  );

  app.intent("AMAZON.HelpIntent",{
      "slots": {},
      "utterances": []
    },
    function(request, response) {
      let helpOutput = "You can say 'mark room 123 on floor 4 to clean' or ask 'what rooms are there to clean'. You can also say stop or exit to quit.";
      let reprompt = "What would you like to do?";
      // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
      response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
      return;
    }
  );

  app.intent("AMAZON.StopIntent",{
      "slots": {},
      "utterances": []
    },
    function(request, response) {
      let stopOutput = "The Hospital Room Manager is finished for now.";
      response.say(stopOutput);
      return;
    }
  );

  app.intent("AMAZON.CancelIntent",{
      "slots": {},
      "utterances": []
    },
    function(request, response) {
      var cancelOutput = "No problem. Request cancelled.";
      response.say(cancelOutput);
      return;
    }
  );

  return app;
};

module.exports = hospitalRoom;
