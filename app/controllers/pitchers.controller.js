const Pitcher = require("../models/pitcher.model.js");

//Retrieve all pitchers
exports.findAll = (req, res) => {
  Pitcher.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pitchers."
      });
    else res.send(data);
  });
};

//Find a single Pitcher with a pitcherID
exports.findOne = (req, res) => {
  Pitcher.findById(req.params.pitcherId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.pitcherId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.pitcherId
        });
      }
    } else res.send(data);
  });
};

exports.findSessionsById = (req, res) => {
  Pitcher.getSessionsById(req.params.pitcherId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Session with PitcherId ${req.params.pitcherId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Session with PitcherId " + req.params.pitcherId
        });
      }
    } else res.send(data);
  });
};
exports.findSessionsByIdWithDate = (req, res) => {
  Pitcher.getSessionsByIdWithDate(req.params.pitcherId,req.params.fromDate, req.params.toDate, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Session with PitcherId ${req.params.pitcherId}.`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Session with PitcherId " + req.params.pitcherId
        });
      }
    } else res.send(data);
  });
};

exports.getMaxAvgPitchType = (req, res) => {
  Pitcher.getMaxAvgPitchType(
    req.params.sessionID,
    req.params.pitchType,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Session with ${req.params.sessionID}. or pitch type ${req.params.pitchType}`
          });
        } else {
          res.status(500).send({
            message:
              "Error retrieving Session with sessionID " + req.params.sessionID
          });
        }
      } else res.send(data);
    }
  );
};

exports.getMaxAvg = (req, res) => {
  Pitcher.getMaxAvg(req.params.pitcherId, req.params.pitchType, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Session with ${req.params.pitcherId}. or pitch type ${req.params.pitchType}`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Session with PitcherId " + req.params.pitcherId
        });
      }
    } else res.send(data);
  });
};

exports.getSessionData = (req, res) => {
  Pitcher.getSessionData(req.params.sessionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Session with ${req.params.sessionID}`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Session with PitcherId " + req.params.pitcherId
        });
      }
    } else res.send(data);
  });
};

exports.getChartData = (req, res) => {
  Pitcher.getChartData(
    req.params.pitcherId,
    req.params.pitchType,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Values with pitcher ${req.params.pitcherId}. or pitch type ${req.params.pitchType}`
          });
        } else {
          res.status(500).send({
            message:
              "Error retrieving Session with PitcherId " + req.params.pitcherId
          });
        }
      } else res.send(data);
    }
  );
};

exports.getChartDataAvg = (req, res) => {
  Pitcher.getChartDataAvg(
    req.params.pitcherId,
    req.params.pitchType,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Values with pitcher ${req.params.pitcherId}. or pitch type ${req.params.pitchType}`
          });
        } else {
          res.status(500).send({
            message:
              "Error retrieving Session with PitcherId " + req.params.pitcherId
          });
        }
      } else res.send(data);
    }
  );
};

exports.getChartDataSession = (req, res) => {
  Pitcher.getChartDataSession(
    req.params.sessionID,
    req.params.pitchType,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Values with session ${req.params.sessionID}. or pitch type ${req.params.pitchType}`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Session with " + req.params.sessionID
          });
        }
      } else res.send(data);
    }
  );
};

exports.getChartDataSessionAvg = (req, res) => {
  Pitcher.getChartDataSessionAvg(
    req.params.sessionID,
    req.params.pitchType,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Values with session ${req.params.sessionID}. or pitch type ${req.params.pitchType}`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Session with " + req.params.sessionID
          });
        }
      } else res.send(data);
    }
  );
};

exports.filterSession = (req, res) => {
  Pitcher.filterSession(
    req.params.sessionID, 
    req.params.lowVelo, 
    req.params.highVelo, 
    req.params.lowTotalSpin,
    req.params.highTotalSpin,
    req.params.lowSpin, 
    req.params.highSpin, 
    req.params.lowVbreak, 
    req.params.highVbreak, 
    req.params.lowHbreak, 
    req.params.highHbreak, 
    req.params.lowRheight, 
    req.params.highRheight, 
    req.params.lowRside, 
    req.params.highRside, 
    (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Session with ${req.params.pitcherId}. or pitch type ${req.params.pitchType}`
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Session with PitcherId " + req.params.pitcherId
        });
      }
    } else res.send(data);
  });
};
