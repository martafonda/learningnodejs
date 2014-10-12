'use strict';
var net = require('net');
var testing = require('testing');
//var port = 1702;
function start(port, callback) {
  var server = net.createServer(function(connection) {
      console.log('Connection open');
      connection.write('Hello?\r\n');
      connection.on('data', function(data) {
        if (String(data).trim().toLowerCase() != 'hello') {
            connection.write('ERROR\r\n');
        } else {
            connection.end('world\r\n');
            console.log('connection closed');
        }
    });
    //Manejo error event
    connection.on('error',function(){
      console.error('Connection closed with error: %s', error);
    });
    //Manejo close event
    connection.on('error',function(){
      console.log('Connection closed!');
    });
  });
  server.listen(port, callback);
  console.log("Socket server listening on port %s", port);
  return server;
};

function testServer(callback) {
    var port = 1705;
    var server = start(port, function(error) {
        testing.check(error, 'Could not start server', callback);
        console.log('started');
        var socket = net.connect(port, 'localhost', function(error) {
            testing.check(error, 'Could not connect', callback);
            socket.on('data', function(data) {
                console.log('Received ' + data);
                var message = String(data).trim();
                if (message == 'Hello?')
                {
                    socket.write('hello');
                    return;
                }
                testing.assertEquals(message, 'world', 'Bad response', callback);
                server.close(function(error) {
                    testing.check(error, 'Could not stop server', callback);
                    testing.success(callback);
                });
            });
        });
    });
}

// run tests if invoked directly
if (__filename == process.argv[1])
{
    testing.run([testServer], testing.show);
}