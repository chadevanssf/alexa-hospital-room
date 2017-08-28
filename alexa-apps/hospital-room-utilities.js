var SESSION_FLOOR = "FLOOR";

module.exports = {

  setFloor: function(request, floor) {
    if (request.hasSession()) {
      var session = request.getSession();

      if (floor) {
        session.set(SESSION_FLOOR, floor);
      }
    }
  },

  getAndSetFloor: function(request, defaultFloor) {
    var floor = defaultFloor;
    if (request.hasSession()) {
      var session = request.getSession();

      if (floor) {
        setFloor(request, defaultFloor);
      } else {
        floor = session.get(SESSION_FLOOR);
      }
    }
    return floor;
  }
}
