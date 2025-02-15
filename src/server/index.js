const express = require("express");
const rotearAlimento = require("../alimento/router");
const app = express();


app.use(express.json());

app.use(express.static("public"));

rotearAlimento(app);

module.exports = app;
