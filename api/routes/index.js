const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/artists', (req, res, next) => {
  models.Artist.find({}, (err, docs) => {
    if (err) return next(err);
    res.send(docs);
  });
});

router.get('/pages', (req, res, next) => {
  models.Page.find({}, (err, docs) => {
    if (err) return next(err);
    res.send(docs);
  })
})

router.get('/about', (req, res, next) => {
  res.send({'title': 'about_us'});
});

router.get('/wiki/:url_name', (req, res, next) => {
  const url_name = req.params.url_name;
  models.Page.findOne({
    url_name: url_name
  }, (err, doc) => {
    if (!doc) return next(err)
    res.send(doc);
  });
});

module.exports = router;