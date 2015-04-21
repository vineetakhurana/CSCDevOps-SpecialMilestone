var http = require('http'),
httpProxy = require('http-proxy'); //put in package.json
//var Resilient = require('resilient') 

var servers = [
"http://52.5.5.40:5000",
"http://52.5.136.185:5000",
"http://52.5.243.226:5000",
"http://52.5.81.233:5000",
"http://52.1.222.51:5000"
]

var chaos = [];
//var i = 0;

var proxy_s = httpProxy.createServer();

http.createServer(function(req,res){
var target = { target: servers.shift() };
	console.log('balancing request to:',target);
	proxy_s.web(req,res,target);
	servers.push(target.target);
}).listen(3000);

http.createServer(function(req,res){

	res.writeHead(200, {'Content-Type': 'text/html'});
	//res.(servers);
	res.write("<h1>"+servers+"</h1>");

	res.end();

}).listen(3002);

function getReq()
{
// var client = Resilient({discovery: { basePath: '/'}})
// //client.setServers(servers)
// client.discoveryServers(servers) //takes time upto 5s
// client.get('/',function(err,res)
// {
// 	// if(err && err.code === 'ECONNREFUSED')
	// 	console.log("none running");
	// else if(res.status === 200)
	// 	console.log('success:',res.data);
	console.log("servers list:",servers);
	console.log("removed:",chaos);
	//console.log("here");
	

// })
}

function removeServer()
{
	//var index = servers.indexOf("http://localhost:5002");
	var len = servers.length;
	console.log("length of servers:",len);
	var index = Math.ceil((len/2)-1); //logic
	//console.log("index:",index);
	chaos.push(servers[index]);
	servers.splice(index,1)
}

function addServer()
{
	if(chaos.length!=0)
	{
		console.log("added now");
		//var clen = chaos.length;
		servers.push(chaos[0]);
		console.log("this will be added:",chaos[0]);
		chaos.splice(0,1);
	}
}
setInterval(function() {getReq()},10000);
setInterval(function() {removeServer()}, 6000);
setInterval(function() {addServer()},13000);
