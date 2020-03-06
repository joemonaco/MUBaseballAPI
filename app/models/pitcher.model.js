const sql = require("./db.js");

//constructor
const Pitcher = function(pitcher) {
  this.name = pitcher.player_name;
  this.throws = pitcher.handedness;
  this.dob = pitcher.dob;
};

Pitcher.getAll = result => {
  sql.query("SELECT * FROM pitcher order by _id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Pitcher.findById = (pitcherId, result) => {
  sql.query(`SELECT * FROM pitcher WHERE _id = ${pitcherId}`, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pitcher: ", res[0]);
      result(null, res[0]);
      return;
    }

    //not found
    result({ kind: "not_found" }, null);
  });
};

Pitcher.getSessionsById = (pitcherId, result) => {
  sql.query(
    `SELECT * FROM session s where s.Pitcher__id = ${pitcherId} ORDER BY s.date DESC`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found session: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};
Pitcher.getSessionsByIdWithDate = (pitcherId, fromDate, toDate, result) => {
  sql.query(
    `SELECT * FROM session s where s.pitcher__id =${pitcherId} and s.date BETWEEN '${fromDate}' and '${toDate}' ORDER BY s.date;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found session: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.getMaxAvgPitchType = (sessionID, pitchType, result) => {
  sql.query(
    `select AVG(speed), MAX(speed), Pitch_Type_pitchType from captured_data where sessionID=${sessionID} group by Pitch_Type_pitchType;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found AVG and MAX: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.getMaxAvg = (pitcherId, pitchType, result) => {
  sql.query(
    `select Pitcher_pitcher_id, AVG(speed), MAX(speed), Pitch_Type_pitchType from captured_data group by Pitch_Type_pitchType, Pitcher_pitcher_id order by Pitcher_pitcher_id;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found AVG and MAX: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.getSessionData = (sessionID, result) => {
  sql.query(
    `select Pitch_Type_pitchType, strike, releaseSide, releaseHeight, horizontalBreak, verticalBreak, spin, trueSpin, szx, szy, speed, spinConfidence, spinEfficiency, launchAngle, rifleSpin, horizontalAngle, gyroDegree from captured_data where sessionID=${sessionID};`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found session: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.getChartData = (pitcherId, pitchType, result) => {
  sql.query(
    `SELECT verticalBreak, horizontalBreak, releaseHeight, releaseSide, Pitch_Type_pitchType
    FROM captured_data
    WHERE Pitcher_pitcher_id = ${pitcherId}
    ORDER BY Pitch_Type_pitchType ASC;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Values: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.getChartDataAvg = (pitcherId, pitchType, result) => {
  sql.query(
    `SELECT AVG(verticalBreak), AVG(horizontalBreak), AVG(releaseHeight), AVG(releaseSide), Pitch_Type_pitchType
    FROM captured_data
    WHERE Pitcher_pitcher_id = ${pitcherId}
    GROUP BY Pitch_Type_pitchType;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Averages: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.getChartDataSession = (sessionID, pitchType, result) => {
  sql.query(
    `SELECT verticalBreak, horizontalBreak, releaseHeight, releaseSide, Pitch_Type_pitchType FROM captured_data WHERE sessionID = ${sessionID} ORDER BY Pitch_Type_pitchType ASC;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Values: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.getChartDataSessionAvg = (sessionID, pitchType, result) => {
  sql.query(
    `SELECT AVG(verticalBreak), AVG(horizontalBreak), AVG(releaseHeight), AVG(releaseSide), Pitch_Type_pitchType
    FROM captured_data
    WHERE sessionID = ${sessionID}
    GROUP BY Pitch_Type_pitchType`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Averages: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.filterSession = (
  sessionID,
  lowVelo,
  highVelo,
  lowTotalSpin,
  highTotalSpin,
  lowSpin,
  highSpin,
  lowVbreak,
  highVbreak,
  lowHbreak,
  highHbreak,
  lowRheight,
  highRheight,
  lowRside,
  highRside,
  result
) => {
  sql.query(
    `select * from captured_data where sessionID=${sessionID} 
      and (speed between ${lowVelo} and ${highVelo}) 
      and (spin between ${lowTotalSpin} and ${highTotalSpin})
      and (spinEfficiency between ${lowSpin} and ${highSpin}) 
      and (verticalBreak between ${lowVbreak} and ${highVbreak}) 
      and (horizontalBreak between ${lowHbreak} and ${highHbreak})
      and (releaseHeight between ${lowRheight} and ${highRheight})
      and (releaseSide between ${lowRside} and ${highRside});`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Values: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.filterChartSessionSingle = (
  sessionID,
  lowVelo,
  highVelo,
  lowTotalSpin,
  highTotalSpin,
  lowSpin,
  highSpin,
  lowVbreak,
  highVbreak,
  lowHbreak,
  highHbreak,
  lowRheight,
  highRheight,
  lowRside,
  highRside,
  result
) => {
  sql.query(
    `select verticalBreak, horizontalBreak, releaseHeight, releaseSide, Pitch_Type_pitchType from captured_data where sessionID=${sessionID} 
      and (speed between ${lowVelo} and ${highVelo}) 
      and (spin between ${lowTotalSpin} and ${highTotalSpin})
      and (spinEfficiency between ${lowSpin} and ${highSpin}) 
      and (verticalBreak between ${lowVbreak} and ${highVbreak}) 
      and (horizontalBreak between ${lowHbreak} and ${highHbreak})
      and (releaseHeight between ${lowRheight} and ${highRheight})
      and (releaseSide between ${lowRside} and ${highRside})
      ORDER BY Pitch_Type_pitchType ASC;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Values: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

Pitcher.filterAvgChartSessionSingle = (
  sessionID,
  lowVelo,
  highVelo,
  lowTotalSpin,
  highTotalSpin,
  lowSpin,
  highSpin,
  lowVbreak,
  highVbreak,
  lowHbreak,
  highHbreak,
  lowRheight,
  highRheight,
  lowRside,
  highRside,
  result
) => {
  sql.query(
    `select AVG(verticalBreak), AVG(horizontalBreak), AVG(releaseHeight), AVG(releaseSide), Pitch_Type_pitchType from captured_data where sessionID=${sessionID} 
      and (speed between ${lowVelo} and ${highVelo}) 
      and (spin between ${lowTotalSpin} and ${highTotalSpin})
      and (spinEfficiency between ${lowSpin} and ${highSpin}) 
      and (verticalBreak between ${lowVbreak} and ${highVbreak}) 
      and (horizontalBreak between ${lowHbreak} and ${highHbreak})
      and (releaseHeight between ${lowRheight} and ${highRheight})
      and (releaseSide between ${lowRside} and ${highRside})
      GROUP BY Pitch_Type_pitchType;`,
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found Values: ", res);
        result(null, res);
        return;
      }

      //not found
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Pitcher;
