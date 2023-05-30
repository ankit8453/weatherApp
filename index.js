const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
var city = "Jabalpur";
var weather = "20";
var humidity = "10";
var visibility = "200";
var windSpeed = "2";
var country = "IN";
var wtDescription = "Sunny";

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("weather", {kindOfDate: day, seher: city, temp: weather, desh: country, humid: humidity, visible: visibility, spd: windSpeed, wtType: wtDescription});
});

app.post("/",function(req,res){

    city = req.body.ct;
    var finalApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db7417900c7b02f847c00d8c7aabde40`;

    request(finalApi,function(error, response, body){
        var data = JSON.parse(body);
        weather = (data.main.temp - 273.15).toFixed(0);
        humidity = data.main.humidity;
        visibility = data.visibility;
        windSpeed = data.wind.speed;
        country = data.sys.country;
        wtDescription = data.weather[0].main;
        res.redirect("/");
    });
    
});

app.listen("3000",function(){
    console.log("server started at port 3000");
});