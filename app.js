const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendfile(_dirname + "/email.html");
});

app.post("/", function(req, res){

  const firstname = req.body.fname
  const lastname = req.body.lname
  const email = req.body.email
  const data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastNAME
      }
    }

    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/973f4a622c";

  const options = {
    method: "POST",
    auth: "dane:06cebbd4a2633f0ad4f1dec827fa958c-us14"
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  requst.write(jsonData);
  requst.end();

});

app.listen(process.env.PORT || 8080, function() {
  console.log("Server is listening on port 3000");
});
//053e3cad58629cf8b7f9a91c03630a8f-us14
//c845bd6efb34b8e18c11f28d0fb5c4f8-us14
//06cebbd4a2633f0ad4f1dec827fa958c-us14
//list // ID
//973f4a622c
