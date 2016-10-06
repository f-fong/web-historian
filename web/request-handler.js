var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');

var routeActions = {
  'GET': function(req, res) {
    if (req.url === '/' || req.url === '/index.html') {
      helpers.serveAssets(res, 'index.html');
    } else if (req.url === '/styles.css') {
      helpers.serveAssets(res, 'styles.css');
    } else if (req.url === '/loading.html') {
      helpers.serveAssets(res, 'loading.html');
    } else if (req.url === '/favicon.ico') {
      helpers.send404(res);
    } else {
      var url = req.url.slice(1);

      // check if in archive
        // if yes, send back
        // if not, send a 404
      archive.isUrlInList(url, function(exists) {
        // helpers.sendContent(res, url);
        if (exists) {
          helpers.sendContent(res, url);
        } else {
          helpers.send404(res);
        }
      });
    }
  },
  'POST': function(req, res) {

  }
};

exports.handleRequest = function (req, res) {
  if (routeActions[req.method]) {
    routeActions[req.method](req, res);
  }

  // us/server-facing
    // check for archived sites
    // add sites to be archived
    // return archived sites

  // get request for google.com
    // go into archives/sites/ and find google
    // send that file back




  // res.end(archive.paths.list);
};
