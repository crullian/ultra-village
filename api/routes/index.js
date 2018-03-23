const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  models.Page.find({}, (err, docs) => {
    res.send({
      title: "Welcome To Ultra Village",
      docs: docs
    });
  });
});

router.get('/about', (req, res, next) => {
  res.send({'title': 'about_us'});
});

router.get('/wiki/:url_name', (req, res, next) => {
  const url_name = req.params.url_name;
  models.Page.findOne({
    url_name: url_name
  }, (err, doc) => {
    // if (err) return next(err)
    if (!doc) return next(err)
    res.send(doc);
  });
});

module.exports = router;