module.exports = app => {
  const pitchers = require("../controllers/pitchers.controller.js");

  //Retreive all Pitchers
  app.get("/pitchers", pitchers.findAll);

  //Retreive a single Pitcher with pitcherID
  app.get("/pitcher/:pitcherId", pitchers.findOne);

  //Get All Sessions by a Pitcher with pitcherID
  app.get("/sessions/all/:pitcherId", pitchers.findSessionsById);

  //Get max and average velocity for a single session
  app.get("/MaxAvg/one/:sessionID/:pitchType", pitchers.getMaxAvgPitchType);

  //Get max and avg velocity for all sessions
  app.get("/MaxAvg/all/:pitcherId", pitchers.getMaxAvg);

  //Get all data for selected session
  app.get("/session/:sessionID", pitchers.getSessionData);

  // Release and Movement routes

  // Get Release and Movement VALUES for all data on a pitcher
  app.get("/sessions/all/chartData/:pitcherId", pitchers.getChartData);

  // Get Release and Movement AVERAGES for all data on a pitcher
  app.get("/sessions/all/chartDataAvg/:pitcherId", pitchers.getChartDataAvg);

  // Get Release and Movement VALUES for a single session
  app.get("/sessions/one/chartData/:sessionID/", pitchers.getChartDataSession);

  // // Get Release and Movement AVERAGES for a single session
  app.get(
    "/sessions/one/chartDataAvg/:sessionID/",
    pitchers.getChartDataSessionAvg
  );
};
