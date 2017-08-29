var SESSION_ROOM = "HRM_ROOM";
var SESSION_FLOOR = "HRM_FLOOR";

var roomUtilities = {};

roomUtilities.setFloor = function(request, val) {
  roomUtilities.setSessionValue(request, val, SESSION_FLOOR);
};

roomUtilities.getAndSetFloor = function(request, defaultVal) {
  roomUtilities.getAndSetSessionValue(request, defaultVal, SESSION_FLOOR);
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
