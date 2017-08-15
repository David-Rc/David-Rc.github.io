/**
 * Created by Dev-RC on 05/03/2017.
 */
const http = require('http');
const net  = require('net');
const url  = require('url');

var proxy = http.createServer(function(res, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Server run')

    });

proxy.on('connect', function(req, cltSocket, head){
    var srvUrl = url.parse(`http: `)
});