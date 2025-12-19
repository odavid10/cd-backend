const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

// CORS
app.use(cors());

// configuracion de cabeceras
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

app.use(bodyparser.urlencoded({ extended: true, limit: "16mb" }));
app.use(bodyparser.json({ limit: "16mb" }));

app.use(routes);

module.exports = app;
