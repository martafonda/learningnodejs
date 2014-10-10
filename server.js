var http = require('http');//importamos modulo http de node

//Callback
http.createServer(function (request, response) { //Creo servidor
  response.write('Hola, mundo\n');
  response.write('Adios, mundo');
  response.end();
}).listen(1337, '127.0.0.1'); //Le digo que se ponga a escuchar por un puerto

console.log('Server running at http://127.0.0.1:1337/');