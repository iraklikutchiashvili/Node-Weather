const express = require("express");
const htpps = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){

    console.log();

    const query = req.body.cityName;
    const apiKey = "8a1c36a5bef05098f01435b3beeee34a";
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;

    htpps.get(url, function(response){

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write(`<h1>Temperature in ${query} is ${temp} degrees Celcius.</h1>`);
            res.write(`<p>The weather currently is ${weatherDescription}</p>`);
            res.write(`<img src=${iconUrl}>`);

            res.send();
        })

    })

})



app.listen(3000, () => {
    console.log("Server Running on port 3000.");
})