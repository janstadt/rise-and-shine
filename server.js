var  request = require('request'),
express = require("express"),
config = require('./config'),
app = express(),
pingServer,
sendPing;

  app.use(express.bodyParser());
  
  sendPing = function(url) {
    request.get(url, function() {
      console.log('RESPONSE FROM: ' + url);
      pingServer(url);
    });
  };

  pingServer = function(url) {
    var urlToPing = url;
    setTimeout(function(){
      var date = new Date(),
          hours = date.getHours();
      if(hours >= 7 && hours <= 24) {
        console.log('PINGING ' + urlToPing + ' ' + date.toString());
        sendPing(urlToPing);
      }
    }, config.pingFrequency);
  };

  for(var i=0; i < config.urlsToPing.length; i++) {
    var url = config.urlsToPing[i];
    pingServer(url);
  }

  pingServer(config.pingServerUrl);

var port = process.env.PORT || 3000;
var server = app.listen(port);
console.log("*****Server running on port " + port);
