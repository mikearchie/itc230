var http = require("http");
var fs = require('fs');

function serveStatic(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    console.log(__dirname + path);
    fs.readFile(__dirname + path, function(err, data){
        if(err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        }
        else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    })
}

http.createServer(function(req,res) {
  var path = req.url.toLowerCase();
  switch(path) {
    case '/':
      serveStatic(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      serveStatic(res, '/package.json', 'text/plain');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);
