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

module.exports = roomUtilities;
