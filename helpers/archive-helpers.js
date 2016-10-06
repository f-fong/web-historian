var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');
var querystring = require('querystring');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    callback(String(data).split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls) {
    if (urls.indexOf(url) !== -1) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(exists) {
    if (exists) {
      callback();
    } else {
      fs.appendFile(exports.paths.list, url + '\n', function(err) {
        if (err) {
          throw err;
        }

        callback();
      });
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) {
      throw err;
    }

    if (files.indexOf(url) !== -1) {
      // REMOVE ME
      // console.log('calling with true');
      // console.log(files);
      // exports.isUrlInList(url, function(exists) {
      //   if (exists) {
      //     console.log(url, 'is also in the list');
      //   } else {
      //     console.log(url, 'is NOT in the list');
      //   }
      // });

      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach(function(url) {
    var unescapedUrl = querystring.unescape(url);

    // console.log('about to send request 0000000000000');
    // http.request(options, function(response) {
    //   console.log('getting response');
    //   var data = '';

    //   response.on('data', function(chunk) {
    //     data += chunk;
    //   });

    //   response.on('end', function() {
    //     fs.writeFile(exports.paths.archivedSites + '/' + url, data, function(err) {
    //       if (err) {
    //         throw err;
    //       }
    //       // consider testing for this in the future
    //       exports.addUrlToList(url, function() { });
    //     });
    //   });
    // }).end();

    request(unescapedUrl, function (err, res, body) {
      if (err) {
        throw err;
      }

      console.log(body);
      fs.writeFile(exports.paths.archivedSites + '/' + url, body, function(err) {
        if (err) {
          throw err;
        }
      
        exports.addUrlToList(url, function() { });
      });
    });



  });

};
