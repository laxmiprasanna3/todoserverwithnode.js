const http = require("http");
const port = 8081;
const todolist =["Hey","Hello","how","are","you!!"] 
http.createServer((req,res)=>{
const {method, url} = req;

if(url==="/todos"){
    if(method==="GET"){
    console.log("todos route, and it's a get method")
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(todolist.toString())
}else if(method==="POST"){
    let body="";
    req.on('error',(err)=>{
        console.log(err)
    }).on('data',(chunk)=>{
        body += chunk;
        console.log("chunk:",chunk);

    }).on('end',()=>{
        body=JSON.parse(body);
        console.log("data: ",body);
        let newtodo = todolist;
        newtodo.push(body.item);
    })
}else if(method==="PUT"){

}else if(method==="DELETE"){
    let body="";
    req.on('error',(err)=>{
        console.log(err)
    }).on('data',(chunk)=>{
        body+=chunk
    }).on('end',()=>{
        body=JSON.parse(body);
        let delethis=body.item;
        for(let i=0;i<todolist.length;i++){
            if(todolist[i]===delethis){
                todolist.splice(i,1);
                break;
            }
        }
    })
}
else{
    res.writeHead(404);
}
}else if(url==="/"){
    console.log("/home default route")
}
console.log(method,url);
res.end();
})
.listen(port,()=>{
    console.log(`NodeJs server started running on port ${port}`);
})