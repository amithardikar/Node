var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");//fileupload
var multer  = require('multer');//for file upload
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
var upload=multer({ dest: '/tmp/'});
app.get('/file_upload.html', function (req, res) {
    res.sendFile( __dirname + "/" + "file_upload.html" );
 })

app.get('postindex.html',function(req,res){
res.sendFile(_dirname+ "/" + "postindex.html")

})
//file upload
app.post('/file_upload', function (req, res) {
    console.log(req.file.name);
    console.log(req.file.path);
    console.log(req.file.type);
    var file = __dirname + "/" + req.file.name;
    
    fs.readFile( req.file.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if( err ){
             console.log( err );
             }else{
                response = {
                   message:'File uploaded successfully',
                   filename:req.file.name
                };
             }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
    });
 })
app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })
 
//You simply need to pass the name of the directory where you keep your static assets,
// to the express.static middleware to start serving the files directly
//'public' is folder name which we have save  index.html 

//instead public we can use ./ also if file is out of folder public or file save where the server.js file exist

app.use(express.static('public'));
app.get('index.html',function(req,res){
res.sendFile(_dirname+ "/" + "index.html")
//_dirname is the predefined keyword
})
app.get('/process_get', function (req, res) {
    // Prepare output on webpage in JSON format
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.send(JSON.stringify(response));
 })

// '/'means in home directory or page
app.get('/', function (req, res) {
    res.send('Hello World');
 })


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})