var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, statusCode) {
  var code = statusCode || 200;
  res.writeHead(code, exports.headers);
  fs.readFile(path.join(__dirname, 'public/', asset), function(err, contents) {
    if (err) {
      throw err;
    }

    res.end(contents);
  });
};

exports.sendContent = function(res, url, statusCode) {
  var code = statusCode || 200;
  fs.readFile(archive.paths.archivedSites + '/' + url, function(err, contents) {
    if (err) {
      throw err;
    }

    res.writeHead(code, exports.headers);

    res.end(contents);
  });
};

exports.send404 = function(res) {
  res.writeHead(404, exports.headers);
  res.end('404 not found lol');
};