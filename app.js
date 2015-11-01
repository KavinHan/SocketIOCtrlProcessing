var express = require('express');
var app = express();
var net = require('net');

app.use(express.static(__dirname + '/public'));

var currentTcpSocket = null;

var tcpServer = net.createServer(function(client) {
  console.log('client connected');
  currentTcpSocket = client;
  client.on('close', function() {
    console.log('client disconnected');
  });
});

//server.listen(sockFile, function() { //UNIX domain sockets  사용시
tcpServer.listen(8090, function() { //'listening' listener
  console.log('PID [' + process.pid + '] TCP Server listening');
});

// url: http://localhost:8080/
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

var wsServer = app.listen(8091, function() {
  var host = wsServer.address().address;
  var port = wsServer.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(wsServer);

io.on('connection', function(socket) {
  // if any client connect this server, will send 'status' event
  socket.emit('status', {
    status: true
  });


  socket.on('save-client-id', function(data) {

  });

  // save server id to clientIDArr
  // same reason with client...
  // so don't need check is serverIDArr has same server socket id.^^
  socket.on('save-server-id', function(data) {
    console.log('Server ID List => ' + JSON.stringify(serverIDArr));
  });

  socket.on('save-client-msg', function(data) {
    console.log(data);
    var num = parseInt(data.msg);
    if (num && currentTcpSocket) currentTcpSocket.write(num.toString());

  });
});
