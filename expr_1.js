var express=require('express');
var app=express();



app.get('/api/expr1',function(req,res){

    res.send("hello world");
});
    app.listen(3000,()=>{
    console.log("listning port 30000")
    });