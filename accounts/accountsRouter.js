const express = require("express");

const AccountsDb = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("wip");
});

module.exports = router;
