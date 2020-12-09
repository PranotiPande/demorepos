var http=require("http");
var fs=require("fs");
var qstring=require("querystring");
var url=require("url");
var m=require("./calc");
function process_request(req,resp){
    const p=url.parse(req.url);
	console.log("query string : "+p.query)
	console.log("path : "+p.path);
    console.log(req.url);
    switch(p.pathname){
        case "/":
            fs.readFile("calc.html",function(err,data)
            {
                if(err)
                {
                    resp.end("error");
                    console.log("error");
                }else{
                    resp.end(data);
                }
            });
            break;
        case "/ans":
            var d=qstring.parse(p.query);
            console.log("in ans");
            console.log(d.num1,d.num2);
            //var sum=m.add(d.num1,d.num2);
            resp.write("Addition "+m.add(d.num1,d.num2)+"  ");
            resp.write("Substraction "+m.sub(d.num1,d.num2)+" ");
            resp.write("Multiplication "+m.multi(d.num1,d.num2)+" ");
            resp.end("Division "+m.div(d.num1,d.num2)+" ");
    }
}
var srv=http.createServer(process_request);
srv.listen(8181);
console.log("Server is running on port 8181");
/*console.log("Addition: "+m.add(10,5));
console.log("Substraction: "+m.sub(10,5));
console.log("Multiplication: "+m.multi(10,5));
console.log("Divison: "+m.div(10,5));*/
