var http=require('http');
var assert=require('assert');
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";
var server=http.createServer(function(req,res){
        
        if(req.method==="GET"){
            //https://stackoverflow.com/questions/38226462/node-js-display-mongodb-documents-with-console-log-no-shell              
                MongoClient.connect(url, function(err, db) {
                   if (err) throw err;
                        console.log("Database connected!");
                        var dbo=db.db("mydb");
                       
                        var found = dbo.collection("customers").find();
                        //.each for index or itrating  
                                found.each(function(err,doc){
                                //assert.equal(err,null);
                                        if(doc!=null)
                                        {
                                                console.log(doc);
                                        }
                                });
                        db.close();
                                        //for retrive only one record
                                        // dbo.collection("customers").findOne({},function(err,res){
                                        //         if(err) throw err;
                                        //         console.log(res.name);});
                                                
                });
              
        } else if(req.method==="POST"){
                MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                                var dbo = db.db("mydb");
                                var myobj = { name: "VAST", address: "Highway 37" };
                                dbo.collection("customers").insertOne(myobj, function(err, res) {
                                          if (err) throw err;
                                                console.log("1 document inserted");
                                                db.close();
                                });
                });
                        

          }
                                // res.writeHead(200,{'content-type':'text/html'});
                                // res.end("hello pure  node GET");
 }).listen(5000);


                console.log('Server running at http://127.0.0.1:5000/');
                // To list all collection exist in database car 
                //if(req.method==="GET"){
                //         MongoClient.connect(url, function(err, db) {
                //                   if (err) throw err;
                //                   console.log("Database connected!");
                //                   var dbo=db.db("car");
                //                 dbo.listCollections().toArray(function(err,collInfos){
                //                         if(err) throw err;
                //                         console.log(collInfos);
                //                         db.close();
                                        
                //                 })
                //         });