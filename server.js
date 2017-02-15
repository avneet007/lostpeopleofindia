var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);

app.use(express.static(__dirname + '/folder_containing_assets_OR_scripts'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(3000);