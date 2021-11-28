const express = require("express");
const App = express.Router();


module.exports = (db) => {

  App.get("/jobs",(req, res) => {
    db.query(
      `
      SELECT
        *
      FROM
      jobs;
    `
    ).then(({ rows: dbResponse }) => {
      console.log("newRes:::", dbResponse);
      res.json(dbResponse)

    });
  });

  return App;
};