const Express = require('express');
const router = require("express").Router();
const App = Express();


module.exports = (db) => {

  App.get("/",(req, res) => {

  });

  return App;
};