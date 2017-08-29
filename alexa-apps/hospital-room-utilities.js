var SESSION_FLOOR = "FLOOR";

module.exports = {

  setFloor: function(request, floor) {
    if (request.hasSession()) {
      var session = request.getSession();

      if (floor) {
        console.log("Setting " + SESSION_FLOOR + ": " + floor);
        session.set(SESSION_FLOOR, floor);
      }
    }
    console.log("Final set " + SESSION_FLOOR + ": " + floor);
  },

  getAndSetFloor: function(request, defaultFloor) {
    var floor = defaultFloor;
    if (request.hasSession()) {
      var session = request.getSession();

      if (floor) {
        setFloor(request, floor);
        console.log("Getting " + SESSION_FLOOR + ": " + floor);
      } else {
        floor = session.get(SESSION_FLOOR);
        console.log("Getting previous " + SESSION_FLOOR + ": " + floor);
      }
    }
    console.log("Final get " + SESSION_FLOOR + ": " + floor);
    return floor;
  }


}
