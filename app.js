const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "b289616c9a4e7a508bb998759b369e5c";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const city = weatherData.name;
      const description = "The weather is currently " + weatherDesc;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<p>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celsius <p>"
      );
      res.write(description);
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server Running");
});
