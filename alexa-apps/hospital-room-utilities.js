const SESSION_ROOM = "HRM_ROOM";
const SESSION_FLOOR = "HRM_FLOOR";

const roomUtilities = {};

// set the room for use later
roomUtilities.setRoom = function(request, val) {
  roomUtilities.setSessionValue(request, val, SESSION_ROOM);
};

// return room if not assigned
// set and return the room if assigned
roomUtilities.getAndSetRoom = function(request, defaultVal) {
  return roomUtilities.getAndSetSessionValue(request, defaultVal, SESSION_ROOM);
};

// set the floor for use later
roomUtilities.setFloor = function(request, val) {
  roomUtilities.setSessionValue(request, val, SESSION_FLOOR);
};

// return floor if not assigned
// set and return the floor if assigned
roomUtilities.getAndSetFloor = function(request, defaultVal) {
  return roomUtilities.getAndSetSessionValue(request, defaultVal, SESSION_FLOOR);
};


roomUtilities.setSessionValue = function(request, val, sessionName) {
  if (request.hasSession()) {
    let session = request.getSession();

    if (val) {
      console.log("Setting " + sessionName + ": " + val);
      session.set(sessionName, val);
    }
  }
  console.log("Final set " + sessionName + ": " + val);
};

roomUtilities.getAndSetSessionValue = function(request, defaultVal, sessionName) {
  let val = defaultVal;
  if (request.hasSession()) {
    let session = request.getSession();

    if (val) {
      roomUtilities.setSessionValue(request, val, sessionName);
      console.log("Getting " + sessionName + ": " + val);
    } else {
      val = session.get(sessionName);
      console.log("Getting previous " + sessionName + ": " + val);
    }
  }
  console.log("Final get " + sessionName + ": " + val);
  return val;
};

roomUtilities.getListResponse = function(rows) {
  var response = "";
  var currentFloor;
  rows.forEach((row) => {
    var fl = row.floor__c;
    var rm = row.room__c;
    if (currentFloor != fl) {
      if (!currentFloor) {
        response += "on floor " + fl + " room " + rm;
      } else {
        response += ", on floor " + fl + " room " + rm;
      }
      currentFloor = fl;
    } else {
      response += ", " + rm;
    }
  });

  return response;
};

roomUtilities.renderTest = function(req, res) {
  var testRows = [
  {
    "room__c": "467",
    "floor__c": "2",
    "status__c": "Needing Cleaning",
    "alexa_is_ready__c": false,
    "name": "02-467",
  },
  {
    "room__c": "234",
    "floor__c": "1",
    "status__c": "Needing Cleaning",
    "alexa_is_ready__c": false,
    "name": "01-234",
  },
  {
    "room__c": "567",
    "floor__c": "1",
    "status__c": "Needing Cleaning",
    "alexa_is_ready__c": false,
    "name": "01-567",
  },
  {
    "room__c": "745",
    "floor__c": "3",
    "status__c": "Needing Cleaning",
    "alexa_is_ready__c": true,
    "name": "03-745",
  }
  ];

  var response = roomUtilities.getListResponse(testRows);

  res.render("util-test", {
    "response": response
  });
};

module.exports = roomUtilities;
