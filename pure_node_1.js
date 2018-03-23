var https = require("https");

// var server = http.createServer(function (request, response) {
  
  
// });
// server.listen(5000);

// http.get('/',function(req,res){

//     res.send("hi");
//     });
const url =
"https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
https.get(url, res => {
res.setEncoding("utf8");
let body = "";
res.on("data", data => {
  body += data;
});
res.on("end", () => {
  body = JSON.parse(body);
  console.log(
    `City: ${body.results[0].formatted_address} -`,
    `Latitude: ${body.results[0].geometry.location.lat} -`,
    `Longitude: ${body.results[0].geometry.location.lng}`
  );
});
});
console.log('Server running at http://127.0.0.1:5000/');