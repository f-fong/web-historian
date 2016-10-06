/*
  use the following cron task to make this run every minute:
    * * * * * /path/to/node /path/to/htmlfetcher.js

  for example:
    * * * * * /usr/local/bin/node /Users/student/2016-09-web-historian/workers/htmlfetcher.js
*/

var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(urls) {
  var downloadQ = [];
  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    
    (function(url, index) {
      archive.isUrlArchived(url, function(exists) {
        if (!exists && url) {
          console.log('going to push to downloadQ:', urls[index]);
          downloadQ.push(urls[index]);
        } 

        if (index === urls.length - 1) {
          console.log('going to download the following:', downloadQ);
          archive.downloadUrls(downloadQ);
        }
      });  
    })(url, i);

  }
});
