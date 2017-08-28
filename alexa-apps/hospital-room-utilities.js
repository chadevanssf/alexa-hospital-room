var SESSION_FLOOR = "FLOOR";

module.exports = {

  setFloor: function(request, floor) {
    if (request.hasSession()) {
      var session = request.getSession();

      if (floor) {
        console.log("Setting floor: " + floor);
        session.set(SESSION_FLOOR, floor);
      }
    }
    console.log("Final setFloor: " + floor);
  },

  getAndSetFloor: function(request, defaultFloor) {
    var floor = defaultFloor;
    if (request.hasSession()) {
      var session = request.getSession();

      if (floor) {
        setFloor(request, floor);
        console.log("Current floor: " + floor);
      } else {
        floor = session.get(SESSION_FLOOR);
        console.log("Getting previous floor: " + floor);
      }
    }
    console.log("Final getAndSetFloor: " + floor);
    return floor;
  }
}
