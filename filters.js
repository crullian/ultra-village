// Setting custom filters on Swig
const marked = require('marked');
const moment = require('moment');

module.exports = function(swig) {
  const page_link = function(doc) {
    let link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page " + doc.url_name;
    }
    return "<a href='" + doc.full_route + "'>" + link_name + "</a>";
  };

  const formatted_date = function(date) {
    console.log('DATE', date);
    return date ? moment(date).format('MMMM Do YYYY, h:mm:ss a') : 'No date available';
  }

  const markedFilter = function(text) {
    return marked(text);
  };
  markedFilter.safe = true;
  swig.setFilter('marked', markedFilter);

  page_link.safe = true;
  swig.setFilter('page_link', page_link);

  formatted_date.safe = true;
  swig.setFilter('formatted_date', formatted_date);
};