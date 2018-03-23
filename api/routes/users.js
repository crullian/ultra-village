const express = require('express');
const router = express.Router();
const models = require('../models/');
 
router.get('/', (req, res, next) => {
  models.User.find({}, (err, users) => {
    res.send({
      title: "User List",
      users: users
    });
  });
});

module.exports = router;
