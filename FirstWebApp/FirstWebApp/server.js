var http = require('http');     //Add the http module
var module1 = require('./JS_Module1');
var module2 = require('./JS_Module2');

function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(module1.NameEQmyName + '\n' + module2.myVariable);
    module1.myNameIs('Jonas');
    module2.myFunction();
    response.end();
}

http.createServer(onRequest).listen(1337);      //Creates a webserver with the port 1337