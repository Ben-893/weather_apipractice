const express = require('express');
const app = express();

app.listen(3000, () => console.log("App listening on port 3000!"));

app.get('/', (req, res) => { res.render("home", { name: "Ben" });
});

app.set("view engine", "ejs");