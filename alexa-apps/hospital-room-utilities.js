var SESSION_ROOM = "HRM_ROOM";
var SESSION_FLOOR = "HRM_FLOOR";

module.exports = {

  setFloor: function(request, val) {
    this.setSessionValue(request, val, SESSION_FLOOR);
  },

  getAndSetFloor: function(request, defaultVal) {
    this.getAndSetSessionValue(request, val, SESSION_FLOOR);
  },

  setSessionValue: function(request, val, sessionName) {
    if (request.hasSession()) {
      var session = request.getSession();

      if (val) {
        console.log("Setting " + sessionName + ": " + val);
        session.set(sessionName, val);
      }
    }
    console.log("Final set " + sessionName + ": " + val);
  },

  getAndSetSessionValue: function(request, defaultVal, sessionName) {
    var val = defaultVal;
    if (request.hasSession()) {
      var session = request.getSession();

      if (val) {
        setSessionValue(request, val, sessionName);
        console.log("Getting " + sessionName + ": " + val);
      } else {
        floor = session.get(sessionName);
        console.log("Getting previous " + sessionName + ": " + val);
      }
    }
    console.log("Final get " + sessionName + ": " + val);
    return val;
  }

}; // end module.exports
