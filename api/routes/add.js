const express = require('express');
const router = express.Router();
const models = require('../models/');

const urlNameMaker = title => {
  let url;
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

router.get('/', (req, res, next) => {
  res.render('add', {
    title: 'Add an artist:'
  });
});

router.post('/submit', (req, res, next) => {
  const artist_name = req.body.artist_name;
  const title = req.body.pageTitle; // req.params is url "constiable" :name, :id, etc
  const body = req.body.pageContent;
  const url_name = urlNameMaker(title);

  // Check if artist_name exists in artistModel
  // if not create the artist
  //   then create the page
  // else
  //   match artist_name with appropriate artistModel
  //   create page 
  //   push page id into artistModel's pages array
  const page = new models.Page({
    "title": title,
    "body": body,
    "url_name": url_name
  });

  page.save();
  res.redirect('/');
});

module.exports = router;