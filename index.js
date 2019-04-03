const express = require("express");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log("App listening on port 3000!"));

app.get("/", (req, res) => {
  axios(
    `https://api.darksky.net/forecast/${process.env.API_KEY}/51.5757,0.1982`,
    { method: "GET" }
  )
    .then(response => {
      console.log(response);

      res.render("home", { data: response.data });
    })
    .catch(error => {
      console.log("there was an error", error);
    });
});

app.use("/location", (req, res) => {
  console.log("we got here", req.body.location);
  axios(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${
      req.body.location
    }&key=${process.env.GOOGLE_API_KEY}`,
    { method: "GET" }
  )
    .then(async response => {
      const result = response.data.results[0].geometry.location;
      console.log(result);
      const coordinates = `${result.lat},${result.lng}`;
      const data = await weather(coordinates);
      console.log("the weather result is", data);

      res.render("home", { data: data });
    })
    .catch(error => {
      console.log("there was an error", error);
    });
});

const weather = async coordinates => {
  try {
    const response = await axios({
      url: `https://api.darksky.net/forecast/${
        process.env.API_KEY
      }/${coordinates}`,
      method: "get"
    });
    return response.data;
  } catch (error) {
    console.warn(`Error getting weather from dark sky ${error}`);
    return error;
  }
};
