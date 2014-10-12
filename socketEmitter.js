var net = require('net');
var util = require('util');
var events = require('events');
var port = 1702;

function Server(port){
  var self = this;
  events.EventEmitter.call(this);

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
};

//Herencia
util.inherits(Server, events.EventEmitter);

var emitter = new Server(1702);

emitter.on('init', function() {
  console.log('Server started');
});
emitter.on('error', function(error) {
  console.error('error: %s', error);
});
emitter.on('close', function() {
  console.log('connection closed');
});