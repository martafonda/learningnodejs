var net = require('net');
var port = 1702;
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
server.listen(port);
console.log("Socket server listening on port %s", port);