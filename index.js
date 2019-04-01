const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv'); dotenv.config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => console.log("App listening on port 3000!"));

app.get('/', (req, res) => { axios(`https://api.darksky.net/forecast/${process.env.API_KEY}/51.5757,0.1982`, { method: 'GET', }).then((response) => {
console.log(response);

res.render("home", { data: response.data }); }).catch((error) => {
console.log('there was an error', error); });
});

app.use("/location", (req, res) => {
console.log('we got here', req.body)
res.render("home", { data: "" });
});