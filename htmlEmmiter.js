var util = require('util');
var events = require('events');
var http = require('http');


function MyEmitter(){
	var self = this;
	events.EventEmitter.call(this);//myEmmiter
	http.createServer(function (request, response) {
		this.emit('request', request);
		response.end('Hello World\n');
	}).listen(1337,'127.0.0.1', function(){
		this.emit('init');
	});
}

util.inherits(MyEmitter, events.EventEmitter);

var myEmitter = new MyEmitter();

myEmitter.on('initialised', function() {
	console.log('Server started');
});

myEmitter.on("data", function(data) {
    console.log('Received data: "' + data + '"');
});