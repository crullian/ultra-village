var express = require('express');
var router = express.Router();
var models = require('../models/');

router.get('/', function(req, res, next) {
  res.render('add', {
    title: 'Add an artist:'
  });
});

router.post('/submit', function(req, res, next) {

  var title = req.body.pageTitle; // req.params is url "variable" :name, :id, etc
  var body = req.body.pageContent;

  var urlNameMaker = function(title) {
    var url;
    if (typeof title != "undefined" && title != "") {
      // url = title.replace(/[\W\s]/g, '_');
      url = title.replace(/\s/ig, '_').replace(/\W/ig,'');
      //url = title.replace(/[\W]/g, '').replace(/[\s]/g, '_'); // replace whitespace w underscore
      if (url.charAt(url.length - 1) === ('_')) {
        url = url.substring(0, url.length - 1);
      }
    } else {
      url = Math.random().toString(36).substring(2, 7);
    }
    return url;
  };

  var url_name = urlNameMaker(title);

  var p = new models.Page({
    "title": title,
    "body": body,
    "url_name": url_name,

  });

  p.save();
  res.redirect('/');
});

module.exports = router;