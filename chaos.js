var http = require('http'),
httpProxy = require('http-proxy'); //put in package.json

var servers = [
"http://52.5.5.40:5000",
"http://52.5.136.185:5000",
"http://52.5.243.226:5000",
"http://52.5.81.233:5000",
"http://52.1.222.51:5000"
]

var chaos = [];
var proxy_s = httpProxy.createServer();

function removeServer()
{
	var len = servers.length;
	console.log("length of servers:",len);
	var index = Math.ceil((len/2)-1); //logic
	chaos.push(servers[index]);
	servers.splice(index,1);
}

function addServer()
{
	if(chaos.length!=0)
	{
		//console.log("added now");
		servers.push(chaos[0]);
		console.log("this will be added:",chaos[0]);
		chaos.splice(0,1);
	}
}
//setInterval(function() {getReq()},10000);
setInterval(function() {removeServer()},8000);
setInterval(function() {addServer()},10000);


http.createServer(function(req,res){
	var target = { target: servers.shift() };
	console.log('balancing request to:',target);
	proxy_s.web(req,res,target);
	servers.push(target.target);
}).listen(3000);

http.createServer(function(req,res){

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<table align=center> <tr> <td align=center> <h3> Servers available &nbsp; &nbsp; </h3> </td> <td align=center> <h3> Time </h3> </td> </tr>");
	for(var each in servers)
	{
		var time = new Date();
		res.write("<tr> <td> <h3>" +  servers[each] + "&nbsp; &nbsp; </h3> </td> <td> <h3>" +  time + "</h3> </td> </tr>");
	}

	res.write("</table>");
	res.end();

}).listen(3002);